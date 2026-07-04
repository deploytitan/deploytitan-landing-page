import { authorType } from './author'
import { articlePerformanceSnapshotType } from './articlePerformanceSnapshot'
import { articleType } from './article'
import { categoryType } from './category'
import { contentBriefType } from './contentBrief'
import { contentInsightType } from './contentInsight'
import { contentOpportunityType } from './contentOpportunity'
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
  productHypothesisConfidenceType,
  seoMetadataType,
  sourceCitationType,
  tableBlockType,
  targetPersonaType,
  topicClusterType,
  utmParametersType,
} from './objects'
import { researchEvidenceType } from './researchEvidence'

export const schemaTypes = [
  articleType,
  marketQuestionType,
  researchEvidenceType,
  contentBriefType,
  contentOpportunityType,
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
  calloutBlockType,
  diagramBlockType,
  tableBlockType,
]
