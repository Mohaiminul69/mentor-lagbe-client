type DashboardPageHeaderProps = {
  title: string
  description?: string
}

export const DashboardPageHeader = ({
  title,
  description,
}: DashboardPageHeaderProps) => {
  return (
    <div className="flex flex-col gap-1.5">
      <h2 className="font-heading text-3xl font-extrabold tracking-[-0.02em]">
        {title}
      </h2>
      {description ? (
        <p className="text-[15px] text-muted-foreground">{description}</p>
      ) : null}
    </div>
  )
}
