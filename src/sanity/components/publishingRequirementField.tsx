import type { JSX } from 'react'
import type { FieldProps } from 'sanity'

type FieldDefinitionWithComponents = {
  title?: string
  description?: string
  components?: {
    field?: (props: FieldProps) => JSX.Element
  }
}

type PublishingRequirementFieldProps = FieldProps & {
  requirement: string
}

function PublishingRequirementField(props: PublishingRequirementFieldProps) {
  const title = props.title?.endsWith(' *') ? props.title : props.title ? `${props.title} *` : props.title
  const description = props.description ? `${props.description} ${props.requirement}` : props.requirement

  return props.renderDefault({
    ...props,
    title,
    description,
  })
}

export function withPublishingRequirement<T extends FieldDefinitionWithComponents>(field: T, requirement: string): T {
  return {
    ...field,
    components: {
      ...field.components,
      field: (props: FieldProps) => <PublishingRequirementField {...props} requirement={requirement} />,
    },
  }
}
