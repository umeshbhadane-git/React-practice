import { NavLink } from "react-router-dom";


const FilterTab = () => {

  return (
        <div className="filters">

            <NavLink
                to="/"
                className={({ isActive }) =>
                    isActive
                        ? "filter-btn active"
                        : "filter-btn"
                }
            >
                All
            </NavLink>

            <NavLink
                to="/active"
                className={({ isActive }) =>
                    isActive
                        ? "filter-btn active"
                        : "filter-btn"
                }
            >
                Active
            </NavLink>

            <NavLink
                to="/completed"
                className={({ isActive }) =>
                    isActive
                        ? "filter-btn active"
                        : "filter-btn"
                }
            >
                Completed
            </NavLink>

        </div>
  )
}

export default FilterTab

