import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import style from './ReorderList.module.css'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { SortableListItem } from '../SortableListItem/SortableListItem'
import { View } from '../../../config/covidDataConfig'

interface Props {
  items: View[]
  setItems: (views: View[]) => void
}

export const ReorderList = ({ items, setItems }: Props) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (over && active.id !== over.id) {
      const oldIndex = items.indexOf(active.id as View)
      const newIndex = items.indexOf(over.id as View)
      setItems(arrayMove(items, oldIndex, newIndex))
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        <ul className={style.sortableList}>
          {items.map((item) => (
            <li key={item}>
              <SortableListItem item={item} />
            </li>
          ))}
        </ul>
      </SortableContext>
    </DndContext>
  )
}
