import { useState, useRef } from "react";

import useLocalStorage from "../customHooks/useLocalStorage";
import usePrevious from "../customHooks/usePrevious";
import useMediaQuery from "../customHooks/useMediaQuery";
import useOnClickOutside from "../customHooks/useOnClickOutside";
import useFetch from "../customHooks/useFetch";
import useDebounce from "../customHooks/useDebounce";


// Type for API response
type User = {
  id: number;
  name: string;
  email: string;
};


const TestCustomeHook = () => {

  // =====================================================
  // 1. useDebounce
  // =====================================================

  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 1000);


  // =====================================================
  // 2. useLocalStorage
  // =====================================================

  const [name, setName] = useLocalStorage(
    "custom-hook-name",
    ""
  );


  // =====================================================
  // 3. usePrevious
  // =====================================================

  const [count, setCount] = useState(0);

  const previousCount = usePrevious(count);


  // =====================================================
  // 4. useMediaQuery
  // =====================================================

  const isMobile = useMediaQuery(
    "(max-width: 768px)"
  );


  // =====================================================
  // 5. useOnClickOutside
  // =====================================================

  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(dropdownRef, () => {
    setIsOpen(false);
  });


  // =====================================================
  // 6. useFetch
  // =====================================================

  const { data, loading, error, } = useFetch<User>(
    "https://jsonplaceholder.typicode.com/users/1"
  );


  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "0 auto",
        padding: "30px",
        fontFamily: "Arial",
      }}
    >

      <h1>Custom Hooks </h1>

      <p>
        Unit-Testing all six custom hooks.
      </p>

      <hr />


      {/* =================================================
          1. useDebounce
      ================================================= */}

      <section>

        <h2>1. useDebounce</h2>

        <input
          type="text"
          placeholder="Type something..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <p>
          <strong>Normal value:</strong>{" "}
          {search}
        </p>

        <p>
          <strong>Debounced value:</strong>{" "}
          {debouncedSearch}
        </p>

        <small>
          Debounced value updates 1 second after
          you stop typing.
        </small>

      </section>


      <hr />


      {/* =================================================
          2. useLocalStorage
      ================================================= */}

      <section>

        <h2>2. useLocalStorage</h2>

        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <p>
          <strong>Name:</strong>{" "}
          {name}
        </p>

        <p>
          Refresh the page.
          Your name should still be there.
        </p>

        <button onClick={() => setName("")}>
          Clear Name
        </button>

      </section>


      <hr />


      {/* =================================================
          3. usePrevious
      ================================================= */}

      <section>

        <h2>3. usePrevious</h2>

        <p>
          <strong>Current count:</strong>{" "}
          {count}
        </p>

        <p>
          <strong>Previous count:</strong>{" "}
          {previousCount ?? "undefined"}
        </p>

        <button
          onClick={() => setCount(count + 1)}
        >
          Increment
        </button>

        <button
          onClick={() => setCount(count - 1)}
          style={{ marginLeft: "10px" }}
        >
          Decrement
        </button>

      </section>


      <hr />


      {/* =================================================
          4. useMediaQuery
      ================================================= */}

      <section>

        <h2>4. useMediaQuery</h2>

        <p>
          Current screen:
          {" "}

          <strong>
            {isMobile
              ? "Mobile"
              : "Desktop"}
          </strong>
        </p>

        <p>
          Resize your browser window
          to see the change.
        </p>

        <p>
          Media query:
          <code>
            {" (max-width: 768px)"}
          </code>
        </p>

      </section>


      <hr />


      {/* =================================================
          5. useOnClickOutside
      ================================================= */}

      <section>

        <h2>5. useOnClickOutside</h2>

        <button
          onClick={() => setIsOpen(true)}
        >
          Open Dropdown
        </button>


        {isOpen && (

          <div
            ref={dropdownRef}
            style={{
              marginTop: "10px",
              padding: "20px",
              border: "1px solid black",
              width: "250px",
            }}
          >

            <h3>Dropdown</h3>

            <p>
              Click outside this box
              to close it.
            </p>

            <button
              onClick={() => setIsOpen(false)}
            >
              Close
            </button>

          </div>

        )}

      </section>


      <hr />


      {/* =================================================
          6. useFetch
      ================================================= */}

      <section>

        <h2>6. useFetch</h2>


        {loading && (
          <p>
            Loading user...
          </p>
        )}


        {error && (
          <p style={{ color: "red" }}>
            Error: {error}
          </p>
        )}


        {data && (

          <div>

            <p>
              <strong>ID:</strong>{" "}
              {data.id}
            </p>

            <p>
              <strong>Name:</strong>{" "}
              {data.name}
            </p>

            <p>
              <strong>Email:</strong>{" "}
              {data.email}
            </p>

          </div>

        )}

      </section>

    </div>
  );
};


export default TestCustomeHook;