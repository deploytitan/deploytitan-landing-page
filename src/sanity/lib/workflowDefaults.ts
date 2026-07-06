type WorkflowChecklistItem = {
  _key: string
  _type: 'workflowChecklistItem'
  label: string
  done: boolean
  notes?: string
}

function checklistItem(label: string): WorkflowChecklistItem {
  return {
    _key: label.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    _type: 'workflowChecklistItem',
    label,
    done: false,
  }
}

export function defaultOpportunityChecklist(): WorkflowChecklistItem[] {
  return [
    checklistItem('Confirm the opportunity is relevant to DeployTitan positioning'),
    checklistItem('Decide whether this should be a new article, refresh, or CTR improvement'),
    checklistItem('Check whether the KPI target is realistic for the selected opportunity'),
    checklistItem('Run Create Brief Pipeline once the opportunity is accepted'),
  ]
}

export function defaultBriefChecklist(): WorkflowChecklistItem[] {
  return [
    checklistItem('Refine the direct answer so it clearly resolves the reader question'),
    checklistItem('Tighten the outline around a differentiated DeployTitan angle'),
    checklistItem('Verify research evidence and customer pain are strong enough'),
    checklistItem('Classify every evidence item as internal, public, or public-summary'),
    checklistItem('Confirm primary keyword, target persona, thesis, CTA goal, and KPI target'),
    checklistItem('Move to Brief Ready when the brief can be handed to drafting'),
  ]
}

export function defaultArticleChecklist(): WorkflowChecklistItem[] {
  return [
    checklistItem('Turn the brief into a strong technical draft'),
    checklistItem('Add citations, FAQ, and customer discovery CTA where relevant'),
    checklistItem('Prepare the public proof layer, methodology note, and evidence section'),
    checklistItem('Review title, excerpt, slug, and SEO metadata'),
    checklistItem('Confirm last reviewed date and technical reviewer owner'),
    checklistItem('Prepare distribution assets and publication plan'),
    checklistItem('Review post-publish KPI performance after 7 and 30 days'),
  ]
}

export function defaultPipelineGuideStages() {
  return [
    {
      _key: 'opportunity-discovery',
      _type: 'pipelineGuideStage',
      title: '1. Opportunity Discovery',
      owner: 'AI + human review',
      summary:
        'Generate opportunities from Search Console, competitor content, and market signals, then import them into Sanity for human review.',
      entryCriteria: [
        'Research script has generated a prompt and candidate payload',
        'ChatGPT or Codex has returned structured JSON opportunities',
      ],
      checklist: [
        'Run pnpm content:research',
        'Review the generated prompt and payload',
        'Get JSON opportunities back from ChatGPT or Codex',
        'Import them with pnpm content:import-opportunities',
        'Review contentOpportunity records in Studio',
      ],
      exitCriteria: [
        'Opportunity is marked accepted, rejected, or still reviewing',
      ],
      relevantDocs: ['contentOpportunity'],
    },
    {
      _key: 'brief-materialization',
      _type: 'pipelineGuideStage',
      title: '2. Brief Materialization',
      owner: 'Human in Studio',
      summary:
        'Accepted opportunities are transformed into market questions, research evidence, a content brief, and when appropriate a seeded article draft.',
      entryCriteria: [
        'Opportunity is relevant and worth pursuing',
        'You know whether it is new, refresh, or CTR oriented',
      ],
      checklist: [
        'Open the contentOpportunity record',
        'Set or confirm KPI target',
        'Use Create Brief Pipeline',
        'Inspect linked marketQuestion, researchEvidence, and contentBrief',
        'Adjust the generated records where needed',
      ],
      exitCriteria: ['Content brief exists and the opportunity is marked briefCreated'],
      relevantDocs: ['contentOpportunity', 'marketQuestion', 'researchEvidence', 'contentBrief', 'article'],
    },
    {
      _key: 'brief-refinement',
      _type: 'pipelineGuideStage',
      title: '3. Brief Refinement',
      owner: 'Human editor',
      summary:
        'Strengthen the brief so it is specific, opinionated, and grounded in evidence before drafting begins.',
      entryCriteria: ['Content brief has been created'],
      checklist: [
        'Refine the direct answer and outline',
        'Define the differentiated thesis and CTA goal',
        'Set target persona and primary keyword',
        'Check the evidence is strong and differentiated',
        'Classify each evidence item for internal/public visibility',
        'Confirm KPI target and success metric',
        'Move the brief to briefReady',
      ],
      exitCriteria: ['Brief status is briefReady'],
      relevantDocs: ['contentBrief', 'marketQuestion', 'researchEvidence'],
    },
    {
      _key: 'evidence-review',
      _type: 'pipelineGuideStage',
      title: '4. Evidence Review',
      owner: 'Editor + subject-matter reviewer',
      summary:
        'Convert raw research into a trustworthy public proof set without exposing sensitive internal material.',
      entryCriteria: ['Brief exists and linked evidence has been assembled'],
      checklist: [
        'Classify evidence visibility and sensitivity',
        'Write sanitized public summaries where needed',
        'Select article-level public evidence overrides only if the brief evidence set needs curation',
        'Draft the methodology note for the article',
      ],
      exitCriteria: ['The brief evidence is classified and the future article has a public-safe proof set'],
      relevantDocs: ['researchEvidence', 'contentBrief', 'article'],
    },
    {
      _key: 'article-production',
      _type: 'pipelineGuideStage',
      title: '5. Article Production',
      owner: 'Writer + reviewer',
      summary:
        'Draft the article from the brief, configure it as a hub, then complete editorial, technical, and SEO checks before publishing.',
      entryCriteria: ['Brief is ready or article is awaitingResearch'],
      checklist: [
        'Write or refresh the article',
        'Add citations, FAQs, CTA, and methodology note',
        'Prepare the public evidence and sources section',
        'Complete SEO title and meta description',
        'Set hub campaign name, revenue goal, primary CTA, and spoke cadence',
        'Run technical review',
        'Move the article to publicationReady before scheduling or publishing',
      ],
      exitCriteria: ['Article is publicationReady, scheduled, or published'],
      relevantDocs: ['article', 'contentBrief'],
    },
    {
      _key: 'distribution-and-measurement',
      _type: 'pipelineGuideStage',
      title: '6. Distribution and Measurement',
      owner: 'AI + human ops',
      summary:
        'Publish the hub, generate six spokes, review CTA readiness, measure KPI performance, and feed the results back into future opportunities and refresh decisions.',
      entryCriteria: ['Article is published'],
      checklist: [
        'Confirm the article is marked as an active hub',
        'Review the generated six-spoke distribution campaign',
        'Confirm CTA labels, CTA URLs, schedule dates, and UTM parameters on each spoke',
        'Capture spoke-level performance snapshots when channel metrics are available',
        'Run content:sync-performance for 7d and 30d windows',
        'Capture article performance snapshots',
        'Review 7-day and 30-day signals',
        'Compare actuals against KPI target',
        'Create or review contentInsight recommendations',
      ],
      exitCriteria: ['The article has a clear keep-growing, refresh, or reposition recommendation'],
      relevantDocs: [
        'article',
        'distributionAsset',
        'articlePerformanceSnapshot',
        'distributionAssetPerformanceSnapshot',
        'contentInsight',
      ],
    },
  ]
}
