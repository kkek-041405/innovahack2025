import TimelineItem from './TimelineItem'

interface ScheduleData {
  date: string
  time?: string
  title: string
}

export default function Timeline({ items }: { items: ScheduleData[] }) {
  return (
    <div className="space-y-6">
      {items.map((item, index) => (
        <TimelineItem
          key={index}
          date={item.date}
          time={item.time}
          title={item.title}
          isFirst={index === 0}
          isLast={index === items.length - 1}
        />
      ))}
    </div>
  )
}
