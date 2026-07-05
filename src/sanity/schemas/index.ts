import { authorType } from './author'
import { articlePerformanceSnapshotType } from './articlePerformanceSnapshot'
import { articleType } from './article'
import { categoryType } from './category'
import { contentBriefType } from './contentBrief'
import { contentInsightType } from './contentInsight'
import { contentOpportunityType } from './contentOpportunity'
import { contentPipelineGuideType } from './contentPipelineGuide'
import { distributionAssetType } from './distributionAsset'
import { marketQuestionType } from './marketQuestion'
import {
  analyticsMetricSetType,
  articleOutlineSectionType,
  calloutBlockType,
  contentKpiTargetType,
  customerDiscoveryCtaType,
  diagramBlockType,
  faqItemType,
  pipelineGuideStageType,
  productHypothesisConfidenceType,
  seoMetadataType,
  sourceCitationType,
  tableBlockType,
  targetPersonaType,
  topicClusterType,
  utmParametersType,
  workflowChecklistItemType,
} from './objects'
import { researchEvidenceType } from './researchEvidence'

export const schemaTypes = [
  articleType,
  marketQuestionType,
  researchEvidenceType,
  contentBriefType,
  contentOpportunityType,
  contentPipelineGuideType,
  distributionAssetType,
  articlePerformanceSnapshotType,
  contentInsightType,
  authorType,
  categoryType,
  seoMetadataType,
  faqItemType,
  utmParametersType,
  analyticsMetricSetType,
  customerDiscoveryCtaType,
  targetPersonaType,
  topicClusterType,
  sourceCitationType,
  articleOutlineSectionType,
  productHypothesisConfidenceType,
  contentKpiTargetType,
  workflowChecklistItemType,
  pipelineGuideStageType,
  calloutBlockType,
  diagramBlockType,
  tableBlockType,
]
