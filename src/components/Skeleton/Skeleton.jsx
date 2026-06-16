import './Skeleton.css'

function Skeleton() {
  return (
    <div className="skeleton-card" aria-hidden="true">
      <div className="skeleton-image pulse" />
      <div className="skeleton-content">
        <div className="skeleton-category pulse" />
        <div className="skeleton-title pulse" />
        <div className="skeleton-text pulse" />
        <div className="skeleton-text short pulse" />
        <div className="skeleton-footer">
          <div className="skeleton-price pulse" />
          <div className="skeleton-button pulse" />
        </div>
      </div>
    </div>
  )
}

export default Skeleton
