import style from './SortableListItem.module.css'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { View, viewColors } from '../../../config/covidDataConfig'

interface Props {
  item: View
}

export const SortableListItem = ({ item }: Props) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item })

  const dndStyle = {
    transform: CSS.Transform.toString(transform),
    transition,
    backgroundColor: viewColors[item].stroke,
  }

  return (
    <div
      className={style.listItem}
      ref={setNodeRef}
      style={dndStyle}
      {...attributes}
      {...listeners}
    >
      {item}
    </div>
  )
}
