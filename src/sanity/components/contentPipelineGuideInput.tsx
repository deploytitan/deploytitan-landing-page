'use client'

import { useEffect, useMemo, useState, type CSSProperties } from 'react'
import { useClient, useFormValue } from 'sanity'

import { apiVersion } from '../env'
import { defaultPipelineGuideStages } from '../lib/workflowDefaults'

type PipelineGuideStage = {
  _key?: string
  title?: string
  owner?: string
  summary?: string
  entryCriteria?: string[]
  checklist?: string[]
  exitCriteria?: string[]
  relevantDocs?: string[]
}

type PipelineGuideConfig = {
  schemaType: string
  relevantDocTypes?: string[]
  title: string
  statusFallback?: string
  statusLabels?: Record<string, string>
  statusToStageKey?: Record<string, string>
  statusNextStep?: Record<string, string>
  fallbackStageKey: string
  defaultNextStep: string
}

function cleanTitle(title?: string) {
  return String(title ?? '').replace(/^\d+\.\s*/, '')
}

export function createContentPipelineGuideInput(config: PipelineGuideConfig) {
  function ContentPipelineGuideInput() {
    const client = useClient({ apiVersion })
    const status = String(useFormValue(['status']) ?? config.statusFallback ?? '')
    const [guideStages, setGuideStages] = useState<PipelineGuideStage[]>(defaultPipelineGuideStages())

    useEffect(() => {
      let cancelled = false

      client
        .fetch<PipelineGuideStage[] | null>(
          '*[_id == "content-pipeline-guide"][0].stages[]{_key,title,owner,summary,entryCriteria,checklist,exitCriteria,relevantDocs}',
        )
        .then((stages) => {
          if (!cancelled && stages?.length) {
            setGuideStages(stages)
          }
        })
        .catch(() => {
          if (!cancelled) {
            setGuideStages(defaultPipelineGuideStages())
          }
        })

      return () => {
        cancelled = true
      }
    }, [client])

    const relevantDocTypes = useMemo(
      () => new Set([config.schemaType, ...(config.relevantDocTypes ?? [])]),
      [config.relevantDocTypes, config.schemaType],
    )
    const relevantStages = useMemo(
      () => guideStages.filter((stage) => stage.relevantDocs?.some((docType) => relevantDocTypes.has(docType))),
      [guideStages, relevantDocTypes],
    )
    const fallbackStages = relevantStages.length ? relevantStages : guideStages
    const activeStageKey = config.statusToStageKey?.[status] ?? config.fallbackStageKey
    const activeStage = fallbackStages.find((stage) => stage._key === activeStageKey) ?? fallbackStages[0]
    const activeStageIndex = fallbackStages.findIndex((stage) => stage._key === activeStage?._key)
    const nextStage = activeStageIndex >= 0 ? fallbackStages[activeStageIndex + 1] : undefined
    const statusTitle = config.statusLabels?.[status] ?? (status || config.title)

    return (
      <div style={styles.panel}>
        <div style={styles.header}>
          <div>
            <div style={styles.eyebrow}>{config.title}</div>
            <div style={styles.title}>{statusTitle}</div>
          </div>
          <div style={styles.badge}>{cleanTitle(activeStage?.title) || 'Content workflow'}</div>
        </div>

        <div style={styles.flow} aria-label="Content pipeline guide flow chart">
          {fallbackStages.map((stage, index) => {
            const isActive = stage._key === activeStage?._key
            const isComplete = activeStageIndex > index

            return (
              <div
                key={stage._key ?? stage.title ?? index}
                style={{
                  ...styles.flowStep,
                  ...(isActive ? styles.flowStepActive : {}),
                  ...(isComplete ? styles.flowStepComplete : {}),
                }}
              >
                <span style={styles.flowNumber}>{index + 1}</span>
                <span>{cleanTitle(stage.title)}</span>
              </div>
            )
          })}
        </div>

        <div style={styles.summary}>{activeStage?.summary}</div>

        <div style={styles.columns}>
          <Checklist title="Do now" items={activeStage?.checklist} />
          <Checklist
            title="Move forward when"
            items={activeStage?.exitCriteria}
            fallback={nextStage ? [`Next stage: ${cleanTitle(nextStage.title)}`] : ['This is the final guide stage.']}
          />
        </div>

        <div style={styles.nextStep}>
          <strong>Next step:</strong> {config.statusNextStep?.[status] ?? config.defaultNextStep}
        </div>
      </div>
    )
  }

  return ContentPipelineGuideInput
}

export const ContentOpportunityPipelineGuideInput = createContentPipelineGuideInput({
  schemaType: 'contentOpportunity',
  title: 'Opportunity stage guide',
  statusFallback: 'discovered',
  fallbackStageKey: 'opportunity-discovery',
  defaultNextStep: 'Review the opportunity, set the KPI target, then create the brief pipeline when accepted.',
  statusLabels: {
    discovered: 'Discovered',
    reviewing: 'Reviewing',
    accepted: 'Accepted',
    rejected: 'Rejected',
    briefCreated: 'Brief Created',
  },
  statusToStageKey: {
    discovered: 'opportunity-discovery',
    reviewing: 'opportunity-discovery',
    accepted: 'brief-materialization',
    rejected: 'opportunity-discovery',
    briefCreated: 'brief-refinement',
  },
  statusNextStep: {
    discovered: 'Decide whether this opportunity is worth reviewing.',
    reviewing: 'Accept, reject, or clarify the opportunity before creating downstream records.',
    accepted: 'Run Create Brief Pipeline to create the market question, evidence, brief, and article.',
    rejected: 'Leave rejected opportunities documented so future imports do not recreate duplicate work.',
    briefCreated: 'Open the linked brief and move into brief refinement.',
  },
})

export const MarketQuestionPipelineGuideInput = createContentPipelineGuideInput({
  schemaType: 'marketQuestion',
  title: 'Market question guide',
  statusFallback: 'unvalidated',
  fallbackStageKey: 'brief-refinement',
  defaultNextStep: 'Validate the question with evidence, then connect it to a content brief.',
  statusLabels: {
    unvalidated: 'Unvalidated',
    validated: 'Validated',
    watching: 'Watching',
  },
  statusToStageKey: {
    unvalidated: 'brief-materialization',
    validated: 'brief-refinement',
    watching: 'brief-refinement',
  },
})

export const ResearchEvidencePipelineGuideInput = createContentPipelineGuideInput({
  schemaType: 'researchEvidence',
  title: 'Evidence guide',
  fallbackStageKey: 'evidence-review',
  defaultNextStep: 'Classify visibility, add a public-safe summary when needed, and link the evidence to the brief.',
})

export const ContentBriefPipelineGuideInput = createContentPipelineGuideInput({
  schemaType: 'contentBrief',
  title: 'Brief stage guide',
  statusFallback: 'researching',
  fallbackStageKey: 'brief-refinement',
  defaultNextStep: 'Tighten the brief until it is ready for drafting.',
  statusLabels: {
    researching: 'Researching',
    briefReady: 'Brief Ready',
    evidenceReviewed: 'Evidence Reviewed',
    drafting: 'Drafting',
    published: 'Published',
  },
  statusToStageKey: {
    researching: 'brief-refinement',
    briefReady: 'article-production',
    evidenceReviewed: 'article-production',
    drafting: 'article-production',
    published: 'distribution-and-measurement',
  },
})

export const ArticlePipelineGuideInput = createContentPipelineGuideInput({
  schemaType: 'article',
  title: 'Current stage guide',
  statusFallback: 'idea',
  fallbackStageKey: 'article-production',
  defaultNextStep: 'Use the checklist below to move the article forward.',
  statusLabels: {
    idea: 'Idea',
    awaitingResearch: 'Awaiting Research',
    briefReady: 'Brief Ready',
    drafting: 'Drafting',
    technicalReview: 'Technical Review',
    publicationReady: 'Publication Ready',
    scheduled: 'Scheduled',
    published: 'Published',
    needsRefresh: 'Needs Refresh',
  },
  statusToStageKey: {
    idea: 'opportunity-discovery',
    awaitingResearch: 'evidence-review',
    briefReady: 'article-production',
    drafting: 'article-production',
    technicalReview: 'article-production',
    publicationReady: 'article-production',
    scheduled: 'article-production',
    published: 'distribution-and-measurement',
    needsRefresh: 'brief-refinement',
  },
  statusNextStep: {
    idea: 'Attach or create the opportunity and brief pipeline.',
    awaitingResearch: 'Curate public-safe evidence and finish the methodology note.',
    briefReady: 'Start drafting from the approved brief.',
    drafting: 'Move the article into technical review once the draft is complete.',
    technicalReview: 'Resolve reviewer notes, SEO metadata, citations, and proof readiness.',
    publicationReady: 'Schedule or publish the article.',
    scheduled: 'Confirm publication timing, CTA readiness, and distribution assets.',
    published: 'Measure 7-day and 30-day KPI performance and review distribution.',
    needsRefresh: 'Revisit the brief, evidence, CTA, and search intent before redrafting.',
  },
})

export const DistributionAssetPipelineGuideInput = createContentPipelineGuideInput({
  schemaType: 'distributionAsset',
  title: 'Distribution guide',
  statusFallback: 'draft',
  fallbackStageKey: 'distribution-and-measurement',
  defaultNextStep: 'Prepare the spoke, CTA, schedule, UTM tags, and published URL.',
  statusLabels: {
    draft: 'Draft',
    ready: 'Ready',
    published: 'Published',
  },
  statusToStageKey: {
    draft: 'distribution-and-measurement',
    ready: 'distribution-and-measurement',
    published: 'distribution-and-measurement',
  },
})

export const ArticlePerformanceSnapshotPipelineGuideInput = createContentPipelineGuideInput({
  schemaType: 'articlePerformanceSnapshot',
  title: 'Measurement guide',
  fallbackStageKey: 'distribution-and-measurement',
  defaultNextStep: 'Capture the metric window, compare it with the KPI target, and record insight recommendations.',
})

export const ContentInsightPipelineGuideInput = createContentPipelineGuideInput({
  schemaType: 'contentInsight',
  title: 'Insight guide',
  fallbackStageKey: 'distribution-and-measurement',
  defaultNextStep: 'Turn the signal into a concrete keep-growing, refresh, distribution, or product recommendation.',
})

export const DistributionAssetPerformanceSnapshotPipelineGuideInput = createContentPipelineGuideInput({
  schemaType: 'distributionAssetPerformanceSnapshot',
  relevantDocTypes: ['distributionAsset'],
  title: 'Spoke measurement guide',
  fallbackStageKey: 'distribution-and-measurement',
  defaultNextStep: 'Capture channel metrics for the spoke and use them to improve future distribution.',
})

function Checklist({
  title,
  items,
  fallback = [],
}: {
  title: string
  items?: string[]
  fallback?: string[]
}) {
  const visibleItems = items?.length ? items : fallback

  return (
    <div>
      <div style={styles.listTitle}>{title}</div>
      <ul style={styles.list}>
        {visibleItems.map((item) => (
          <li key={item} style={styles.listItem}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

const styles: Record<string, CSSProperties> = {
  panel: {
    border: '1px solid var(--card-border-color)',
    borderRadius: 8,
    padding: 16,
    background: 'var(--card-bg-color)',
  },
  header: {
    display: 'flex',
    gap: 12,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 14,
  },
  eyebrow: {
    color: 'var(--card-muted-fg-color)',
    fontSize: 12,
    fontWeight: 600,
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 18,
    fontWeight: 700,
    lineHeight: 1.25,
  },
  badge: {
    border: '1px solid var(--card-border-color)',
    borderRadius: 999,
    padding: '4px 10px',
    fontSize: 12,
    fontWeight: 600,
    whiteSpace: 'nowrap',
  },
  flow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 14,
  },
  flowStep: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    border: '1px solid var(--card-border-color)',
    borderRadius: 999,
    padding: '6px 10px',
    color: 'var(--card-muted-fg-color)',
    fontSize: 12,
    fontWeight: 600,
  },
  flowStepActive: {
    borderColor: 'var(--card-focus-ring-color)',
    color: 'var(--card-fg-color)',
    background: 'var(--card-bg-color)',
  },
  flowStepComplete: {
    color: 'var(--card-fg-color)',
  },
  flowNumber: {
    alignItems: 'center',
    border: '1px solid currentColor',
    borderRadius: 999,
    display: 'inline-flex',
    height: 18,
    justifyContent: 'center',
    width: 18,
  },
  summary: {
    color: 'var(--card-muted-fg-color)',
    fontSize: 14,
    lineHeight: 1.5,
    marginBottom: 14,
  },
  columns: {
    display: 'grid',
    gap: 14,
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
  },
  listTitle: {
    fontSize: 13,
    fontWeight: 700,
    marginBottom: 6,
  },
  list: {
    display: 'grid',
    gap: 6,
    margin: 0,
    paddingLeft: 18,
  },
  listItem: {
    fontSize: 13,
    lineHeight: 1.45,
  },
  nextStep: {
    borderTop: '1px solid var(--card-border-color)',
    fontSize: 13,
    lineHeight: 1.45,
    marginTop: 14,
    paddingTop: 12,
  },
}
