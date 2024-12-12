import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import "./table.css";

const Table = ({ tableTitle, searchBarValue, searchBarOnChange, columns, data, actions, currentPage, setCurrentPage, totalItems }) => {
  const itemsPerPage = 5;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <motion.div
      className='table-section'
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: 0.2 }}
    >
      {/* Header and Search */}
      <div className='table-header-section'>
        <h2 className='header-title'>{tableTitle}</h2>
        <div className='search-bar-box'>
          <Search className='search-icon' size={20} />
          <input
            className='search-bar'
            type="text"
            placeholder='Search Product...'
            onChange={searchBarOnChange}
            value={searchBarValue}
          />
        </div>
      </div>
      <div className='overview-auto'>
        <table className='w-100'>
          <thead>
            <tr>
              {columns.map((col, index) => (
                <th className='table-header-label' key={index + 1}>{col.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <motion.tr
                className='border-top'
                key={index + 1}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.1, delay: 0.2 }}
              >
                {columns.map((col, index) => (
                  <td className='table-content-item' key={index + 1}>
                    {col.render ? col.render(item[col.key], item) : item[col.key]}
                  </td>
                ))}

                {actions && (
                  <td className='table-content-item'>
                    <div className='action-item'>
                      {actions.map((action, index) => (
                        <button
                          key={index + 1}
                          className={action.className}
                          onClick={() => action.onClick(item)}
                        >
                          {action.icon}
                        </button>
                      ))}
                    </div>
                  </td>
                )}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Enhanced Pagination Controls */}
      <div className='pagination-section'>
        <div className='pagination-content'>
          {currentPage !== 1 && (
            <button
              onClick={() => paginate(currentPage - 1)}
              className={`pagination-btn ${currentPage !== 1 && "active-pagination-btn"}`}
            >
              <ChevronLeft className='pagination-btn-icon' size={18} />
            </button>
          )}
          <span className='pagination-text'>Page {currentPage} of {totalPages}</span>
          {
            currentPage !== totalPages && (
              <button
                onClick={() => paginate(currentPage + 1)}
                className={`pagination-btn ${currentPage !== totalPages && "active-pagination-btn"}`}
              >
                <ChevronRight className='pagination-btn-icon' size={18} />
              </button>
            )
          }
        </div>

        <div>Total {tableTitle}: {totalItems}</div>
      </div>
    </motion.div>
  )
};

export default Table;