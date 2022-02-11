import "./styles.css"

type Props = {
  totalPages: number,
  activePage: number,
  onChange: (item: number) => void
}


const Pagination = ({ activePage, totalPages, onChange }: Props) => {

  const items = Array.from(Array(totalPages).keys());
  const checkPreviousPages = () => {
    return totalPages > 0 && activePage > 0;
  }
  const checkNextPages = () => {
    return (activePage + 1) < totalPages
  }

  return (
    <nav aria-label="navigation">
      <ul className="pagination justify-content-center fixed-bottom mb-3">
        <li className="page-item">
          <div className={`page-link ${checkPreviousPages() ? "" : "disable"}`} aria-label="Previous" onClick={() => onChange(activePage -1)}>
            <span aria-hidden="true">&laquo;</span>
            <span className="sr-only"></span>
          </div>
        </li>
        {items.map(item => (
          <li className="page-item" key={item}><div className="page-link" onClick={() => onChange(item)}>{item + 1}</div></li>
        ))}
        <li className="page-item">
          <div className={`page-link ${checkNextPages() ? "" : "disable"}`} aria-label="Next" onClick={() => onChange(activePage +1)}>
            <span aria-hidden="true">&raquo;</span>
            <span className="sr-only"></span>
          </div>
        </li>
      </ul>
    </nav>
  )
}

export default Pagination 