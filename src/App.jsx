import { useState, useCallback } from 'react';
import { useLooks } from './hooks/useLooks.js';
import Header from './components/Header.jsx';
import StatsBar from './components/StatsBar.jsx';
import LooksView from './components/LooksView.jsx';
import ProductsView from './components/ProductsView.jsx';
import LookModal from './components/LookModal.jsx';
import Toast from './components/Toast.jsx';

export default function App() {
  const { looks, addLook, updateLook, deleteLook, toggleFav } = useLooks();

  const [view, setView] = useState('looks');
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [toasts, setToasts] = useState([]);

  function showToast(text) {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, text }]);
    // Clean up after animation completes
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3500);
  }

  function openNew() {
    setEditId(null);
    setModalOpen(true);
  }

  function openEdit(id) {
    setEditId(id);
    setModalOpen(true);
  }

  function handleModalClose() {
    setModalOpen(false);
    setEditId(null);
  }

  function handleSave(data) {
    if (editId) {
      updateLook(editId, data);
      showToast('Look updated!');
    } else {
      addLook(data);
      showToast('Look saved!');
    }
    handleModalClose();
  }

  function handleDelete(id) {
    deleteLook(id);
    showToast('Look deleted.');
  }

  function handleToggleFav(id) {
    const look = looks.find(l => l.id === id);
    toggleFav(id);
    showToast(look && !look.fav ? 'Added to favorites!' : 'Removed from favorites.');
  }

  const editLook = editId ? looks.find(l => l.id === editId) || null : null;

  return (
    <>
      <Header
        search={search}
        onSearch={setSearch}
        view={view}
        onViewChange={setView}
      />

      <main>
        <StatsBar looks={looks} />

        {view === 'looks' ? (
          <LooksView
            looks={looks}
            search={search}
            filter={filter}
            onFilterChange={setFilter}
            onNew={openNew}
            onEdit={openEdit}
            onDelete={handleDelete}
            onToggleFav={handleToggleFav}
          />
        ) : (
          <ProductsView looks={looks} />
        )}
      </main>

      <LookModal
        open={modalOpen}
        editLook={editLook}
        onSave={handleSave}
        onClose={handleModalClose}
      />

      <Toast messages={toasts} />
    </>
  );
}
