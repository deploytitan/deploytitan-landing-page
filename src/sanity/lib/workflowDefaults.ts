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
    checklistItem('Run Create Article Draft once the opportunity is accepted'),
  ]
}

export function defaultBriefChecklist(): WorkflowChecklistItem[] {
  return [
    checklistItem('Refine the direct answer so it clearly resolves the reader question'),
    checklistItem('Tighten the outline around a differentiated DeployTitan angle'),
    checklistItem('Verify research evidence and customer pain are strong enough'),
    checklistItem('Classify every evidence item as internal or public'),
    checklistItem('Confirm primary keyword, target persona, CTA goal, and KPI target'),
    checklistItem('Move to Ready to Draft when the plan can be handed to drafting'),
  ]
}

export function defaultArticleChecklist(): WorkflowChecklistItem[] {
  return [
    checklistItem('Turn the opportunity angle into a strong technical draft'),
    checklistItem('Add citations, FAQ, and customer discovery CTA where relevant'),
    checklistItem('Attach only the proof needed to support important claims'),
    checklistItem('Review title, excerpt, slug, and SEO metadata'),
    checklistItem('Set last reviewed date when the article has been accuracy checked'),
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
        'For single-record edits, use Copy for ChatGPT and Import from ChatGPT in Studio',
        'Review contentOpportunity records in Studio',
      ],
      exitCriteria: [
        'Opportunity is marked accepted, rejected, or still reviewing',
      ],
      relevantDocs: ['contentOpportunity'],
    },
    {
      _key: 'article-materialization',
      _type: 'pipelineGuideStage',
      title: '2. Article Draft Creation',
      owner: 'Human in Studio',
      summary:
        'Accepted opportunities are transformed into a seeded article draft with only the evidence needed to keep the piece grounded.',
      entryCriteria: [
        'Opportunity is relevant and worth pursuing',
        'You know whether it is new, refresh, or CTR oriented',
      ],
      checklist: [
        'Open the contentOpportunity record',
        'Use Copy for ChatGPT and Import from ChatGPT if the opportunity fields need AI cleanup',
        'Set or confirm KPI target',
        'Use Create Article Draft',
        'Inspect the linked article and evidence',
        'Delete or ignore evidence that will not help the article',
      ],
      exitCriteria: ['Article draft exists and the opportunity is marked articleCreated'],
      relevantDocs: ['contentOpportunity', 'researchEvidence', 'article'],
    },
    {
      _key: 'article-shaping',
      _type: 'pipelineGuideStage',
      title: '3. Article Shaping',
      owner: 'Human editor',
      summary:
        'Shape the draft until the article has a clear answer, point of view, proof, and publishable structure.',
      entryCriteria: ['Article draft has been created'],
      checklist: [
        'Use Copy for ChatGPT and Import from ChatGPT for structured article planning when useful',
        'Refine the direct answer and primary question',
        'Turn the outline into article sections',
        'Confirm primary keyword, persona, and topic cluster',
        'Attach citations or public evidence where claims need support',
        'Confirm KPI target and success metric',
        'Move the article to drafting or technical review',
      ],
      exitCriteria: ['Article is ready for final drafting or review'],
      relevantDocs: ['article', 'researchEvidence'],
    },
    {
      _key: 'evidence-review',
      _type: 'pipelineGuideStage',
      title: '4. Evidence Review',
      owner: 'Writer',
      summary:
        'Keep the article trustworthy without forcing every research note into a separate public proof record.',
      entryCriteria: ['Article has claims that need support'],
      checklist: [
        'Attach a citation for public facts and benchmarks',
        'Use evidence records only for reusable or generated research signals',
        'Mark evidence Public only when it is safe to show on the article page',
        'Write a short methodology note',
      ],
      exitCriteria: ['Article has at least one citation or useful evidence item'],
      relevantDocs: ['article', 'researchEvidence'],
    },
    {
      _key: 'article-production',
      _type: 'pipelineGuideStage',
      title: '5. Article Production',
      owner: 'Writer + reviewer',
      summary:
        'Finish the article, configure it as a hub, then complete editorial and SEO checks before publishing.',
      entryCriteria: ['Article is awaitingResearch, drafting, or technicalReview'],
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
      relevantDocs: ['article'],
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
