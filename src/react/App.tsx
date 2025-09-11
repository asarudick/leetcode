import Counter from './counter/index';
import Controlled from './controlled/index';
import Uncontrolled from './uncontrolled/index';
import SearchFilter from './search-filter';
import Debounced from './debounced';
import { Link, Routes, Route } from 'react-router-dom';
import React from 'react';

function App() {
  return (
    <div style={{ backgroundColor: 'var(--base)', color: 'var(--text)', minHeight: '100vh', padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      <Routes>
        <Route path="/" element={
          <div style={{ textAlign: 'center' }}>
            <h1 style={{ color: 'var(--lavender)', marginBottom: '2rem' }}>React Demos</h1>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center', width: '100%', maxWidth: '300px' }}>
              <li>
                <Link 
                  to="/counter" 
                  style={{ 
                    color: 'var(--lavender)', 
                    textDecoration: 'none', 
                    padding: '0.5rem 1rem', 
                    borderRadius: '0.25rem', 
                    transition: 'all 0.2s ease', 
                    border: '1px solid var(--overlay0)' 
                  }} 
                  onMouseEnter={(e) => { 
                    e.currentTarget.style.color = 'var(--sky)'; 
                    e.currentTarget.style.backgroundColor = 'var(--overlay0)'; 
                    e.currentTarget.style.textDecoration = 'underline'; 
                  }} 
                  onMouseLeave={(e) => { 
                    e.currentTarget.style.color = 'var(--lavender)'; 
                    e.currentTarget.style.backgroundColor = 'transparent'; 
                    e.currentTarget.style.textDecoration = 'none'; 
                  }}
                >
                  Counter
                </Link>
              </li>
              <li>
                <Link
                  to="/controlled"
                  style={{
                    color: 'var(--lavender)',
                    textDecoration: 'none',
                    padding: '0.5rem 1rem',
                    borderRadius: '0.25rem',
                    transition: 'all 0.2s ease',
                    border: '1px solid var(--overlay0)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--sky)';
                    e.currentTarget.style.backgroundColor = 'var(--overlay0)';
                    e.currentTarget.style.textDecoration = 'underline';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--lavender)';
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.textDecoration = 'none';
                  }}
                >
                  Controlled
                </Link>
              </li>
              <li>
                <Link
                  to="/uncontrolled"
                  style={{
                    color: 'var(--lavender)',
                    textDecoration: 'none',
                    padding: '0.5rem 1rem',
                    borderRadius: '0.25rem',
                    transition: 'all 0.2s ease',
                    border: '1px solid var(--overlay0)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--sky)';
                    e.currentTarget.style.backgroundColor = 'var(--overlay0)';
                    e.currentTarget.style.textDecoration = 'underline';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--lavender)';
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.textDecoration = 'none';
                  }}
                >
                  Uncontrolled
                </Link>
              </li>
              <li>
                <Link
                  to="/search-filter"
                  style={{
                    color: 'var(--lavender)',
                    textDecoration: 'none',
                    padding: '0.5rem 1rem',
                    borderRadius: '0.25rem',
                    transition: 'all 0.2s ease',
                    border: '1px solid var(--overlay0)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--sky)';
                    e.currentTarget.style.backgroundColor = 'var(--overlay0)';
                    e.currentTarget.style.textDecoration = 'underline';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--lavender)';
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.textDecoration = 'none';
                  }}
                >
                  Search Filter
                </Link>
              </li>
              <li>
                <Link
                  to="/debounced"
                  style={{
                    color: 'var(--lavender)',
                    textDecoration: 'none',
                    padding: '0.5rem 1rem',
                    borderRadius: '0.25rem',
                    transition: 'all 0.2s ease',
                    border: '1px solid var(--overlay0)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--sky)';
                    e.currentTarget.style.backgroundColor = 'var(--overlay0)';
                    e.currentTarget.style.textDecoration = 'underline';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--lavender)';
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.textDecoration = 'none';
                  }}
                >
                  Debounced
                </Link>
              </li>
            </ul>
          </div>
        } />
        <Route path="/counter" element={<Counter />} />
        <Route path="/controlled" element={<Controlled />} />
        <Route path="/uncontrolled" element={<Uncontrolled />} />
        <Route path="/search-filter" element={<SearchFilter />} />
        <Route path="/debounced" element={<Debounced />} />
      </Routes>
    </div>
  );
}

export default App;