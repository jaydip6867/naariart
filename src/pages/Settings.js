import React, { useState } from 'react';
import { FiPlus, FiTrash2, FiMenu, FiX, FiEdit } from 'react-icons/fi';
import AddRoleModal from '../components/AddRoleModal';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('Measurements');
  const [selectedOutfitType, setSelectedOutfitType] = useState('Salwar Kameez');
  const [newOutfitType, setNewOutfitType] = useState('');
  const [newSubCategory, setNewSubCategory] = useState('');
  const [newSubCategoryUnit, setNewSubCategoryUnit] = useState('In');
  const [newSubCategoryRequired, setNewSubCategoryRequired] = useState(false);
  const [draggedField, setDraggedField] = useState(null);
  const [workerRolls, setWorkerRolls] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [draggedRoll, setDraggedRoll] = useState(null);
  const [editingRoll, setEditingRoll] = useState(null);
  const [outfitTypes, setOutfitTypes] = useState([
    {
      name: 'Salwar Kameez',
      fields: [
        { name: 'Chest', unit: 'In', required: true },
        { name: 'Waist', unit: 'In', required: true },
        { name: 'Hip', unit: 'In', required: true },
        { name: 'Length', unit: 'In', required: false },
        { name: 'Shoulder', unit: 'In', required: false },
        { name: 'Sleeve Length', unit: 'In', required: false },
        { name: 'Arm Hole', unit: 'In', required: false },
        { name: 'Neck', unit: 'In', required: false },
      ]
    },
    {
      name: 'Lehenga',
      fields: [
        { name: 'Waist', unit: 'In', required: true },
        { name: 'Hip', unit: 'In', required: true },
        { name: 'Length', unit: 'In', required: true },
        { name: 'Choli Length', unit: 'In', required: false },
        { name: 'Shoulder', unit: 'In', required: false },
      ]
    },
    {
      name: 'Saree Blouse',
      fields: [
        { name: 'Bust', unit: 'In', required: true },
        { name: 'Waist', unit: 'In', required: true },
        { name: 'Shoulder', unit: 'In', required: true },
      ]
    },
    {
      name: 'Kurta',
      fields: [
        { name: 'Chest', unit: 'In', required: true },
        { name: 'Length', unit: 'In', required: true },
        { name: 'Shoulder', unit: 'In', required: false },
        { name: 'Sleeve Length', unit: 'In', required: false },
      ]
    },
    {
      name: 'Sherwani',
      fields: [
        { name: 'Chest', unit: 'In', required: true },
        { name: 'Waist', unit: 'In', required: true },
        { name: 'Hip', unit: 'In', required: true },
        { name: 'Length', unit: 'In', required: true },
        { name: 'Shoulder', unit: 'In', required: false },
        { name: 'Sleeve Length', unit: 'In', required: false },
      ]
    },
    {
      name: 'Chaniya Choli',
      fields: [
        { name: 'Waist', unit: 'In', required: true },
        { name: 'Hip', unit: 'In', required: true },
        { name: 'Length', unit: 'In', required: true },
        { name: 'Choli Length', unit: 'In', required: false },
        { name: 'Shoulder', unit: 'In', required: false },
      ]
    },
    {
      name: 'Blouse',
      fields: [
        { name: 'Bust', unit: 'In', required: true },
        { name: 'Waist', unit: 'In', required: true },
        { name: 'Shoulder', unit: 'In', required: true },
      ]
    },
    {
      name: 'Chaniya',
      fields: [
        { name: 'Waist', unit: 'In', required: true },
        { name: 'Hip', unit: 'In', required: true },
        { name: 'Length', unit: 'In', required: true },
        { name: 'Shoulder', unit: 'In', required: false },
      ]
    },
    {
      name: 'Gown',
      fields: [
        { name: 'Bust', unit: 'In', required: true },
        { name: 'Waist', unit: 'In', required: true },
        { name: 'Hip', unit: 'In', required: true },
        { name: 'Length', unit: 'In', required: true },
        { name: 'Shoulder', unit: 'In', required: false },
      ]
    },
  ]);

  const tabs = ['Measurements', 'Rolls', 'Skills', 'Work Type', 'Staff Account'];

  const units = ['In', 'Cm', 'Mm'];

  const handleDragStart = (e, field) => {
    setDraggedField(field);
    e.dataTransfer.effectAllowed = 'move';
    e.target.classList.add('dragging');
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    const fieldItem = e.currentTarget;
    fieldItem.classList.add('drag-over');
  };

  const handleDragLeave = (e) => {
    const fieldItem = e.currentTarget;
    fieldItem.classList.remove('drag-over');
  };

  const handleDrop = (e, dropField) => {
    e.preventDefault();
    const fieldItem = e.currentTarget;
    fieldItem.classList.remove('drag-over');

    if (!draggedField || draggedField.name === dropField.name) return;

    const currentOutfit = outfitTypes.find(o => o.name === selectedOutfitType);
    const draggedIndex = currentOutfit.fields.findIndex(f => f.name === draggedField.name);
    const dropIndex = currentOutfit.fields.findIndex(f => f.name === dropField.name);

    if (draggedIndex !== -1 && dropIndex !== -1) {
      const newFields = [...currentOutfit.fields];
      const [removed] = newFields.splice(draggedIndex, 1);
      newFields.splice(dropIndex, 0, removed);

      setOutfitTypes(outfitTypes.map(outfit =>
        outfit.name === selectedOutfitType
          ? { ...outfit, fields: newFields }
          : outfit
      ));
    }
    setDraggedField(null);
  };

  const handleDragEnd = (e) => {
    e.target.classList.remove('dragging');
    // Remove any remaining drag-over classes
    document.querySelectorAll('.field-item').forEach(item => {
      item.classList.remove('drag-over');
    });
    setDraggedField(null);
  };

  const handleAddOutfitType = () => {
    if (newOutfitType.trim()) {
      const newOutfit = {
        name: newOutfitType,
        fields: []
      };
      setOutfitTypes([...outfitTypes, newOutfit]);
      setNewOutfitType('');
    }
  };

  const handleAddSubCategory = () => {
    if (newSubCategory.trim()) {
      const newField = {
        name: newSubCategory,
        unit: newSubCategoryUnit,
        required: newSubCategoryRequired
      };

      setOutfitTypes(outfitTypes.map(outfit =>
        outfit.name === selectedOutfitType
          ? { ...outfit, fields: [...outfit.fields, newField] }
          : outfit
      ));

      setNewSubCategory('');
      setNewSubCategoryUnit('In');
      setNewSubCategoryRequired(false);
    }
  };

  const handleDeleteOutfitType = (outfitName) => {
    setOutfitTypes(outfitTypes.filter(outfit => outfit.name !== outfitName));
  };

  const handleDeleteField = (fieldName) => {
    setOutfitTypes(outfitTypes.map(outfit =>
      outfit.name === selectedOutfitType
        ? { ...outfit, fields: outfit.fields.filter(field => field.name !== fieldName) }
        : outfit
    ));
  };

  // Worker Roll Handlers
  const handleAddRoll = () => {
    setEditingRoll(null);
    setIsModalOpen(true);
  };

  const handleSaveRole = (roleData) => {
    if (editingRoll) {
      // Update existing role
      setWorkerRolls(workerRolls.map(roll => 
        roll.name === editingRoll.name 
          ? { name: roleData.roleDesignation }
          : roll
      ));
      console.log('Role updated:', roleData);
    } else {
      // Add new role
      setWorkerRolls([...workerRolls, { name: roleData.roleDesignation }]);
      console.log('New role saved:', roleData);
    }
  };

  const handleDeleteRoll = (rollName) => {
    setWorkerRolls(workerRolls.filter(roll => roll.name !== rollName));
  };

  const handleEditRoll = (roll) => {
    setEditingRoll(roll);
    setIsModalOpen(true);
  };

  // Worker Roll Drag and Drop Handlers
  const handleRollDragStart = (e, roll) => {
    setDraggedRoll(roll);
    e.dataTransfer.effectAllowed = 'move';
    e.target.classList.add('dragging');
  };

  const handleRollDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    const rollItem = e.currentTarget;
    rollItem.classList.add('drag-over');
  };

  const handleRollDragLeave = (e) => {
    const rollItem = e.currentTarget;
    rollItem.classList.remove('drag-over');
  };

  const handleRollDrop = (e, dropRoll) => {
    e.preventDefault();
    const rollItem = e.currentTarget;
    rollItem.classList.remove('drag-over');

    if (!draggedRoll || draggedRoll.name === dropRoll.name) return;

    const draggedIndex = workerRolls.findIndex(r => r.name === draggedRoll.name);
    const dropIndex = workerRolls.findIndex(r => r.name === dropRoll.name);

    if (draggedIndex !== -1 && dropIndex !== -1) {
      const newRolls = [...workerRolls];
      const [removed] = newRolls.splice(draggedIndex, 1);
      newRolls.splice(dropIndex, 0, removed);
      setWorkerRolls(newRolls);
    }
    setDraggedRoll(null);
  };

  const handleRollDragEnd = (e) => {
    e.target.classList.remove('dragging');
    // Remove any remaining drag-over classes
    document.querySelectorAll('.roll-item').forEach(item => {
      item.classList.remove('drag-over');
    });
    setDraggedRoll(null);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Measurements':
        return (
          <div className="measurements-content">
            <div className="outfit-types-panel">
              <div className="panel-header">
                <h3>Outfit Types</h3>
              </div>
              <div className="add-outfit-type">
                <input
                  type="text"
                  placeholder="Enter to add Field"
                  value={newOutfitType}
                  onChange={(e) => setNewOutfitType(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddOutfitType()}
                  className="add-input"
                />
                <button className="add-btn" onClick={handleAddOutfitType}>
                  <FiPlus />
                  Add
                </button>
              </div>
              <div className="outfit-types-list">
                {outfitTypes.map((outfit, index) => (
                  <div
                    key={index}
                    className={`outfit-type-item ${selectedOutfitType === outfit.name ? 'active' : ''}`}
                    onClick={() => setSelectedOutfitType(outfit.name)}
                  >
                    <div className="outfit-type-info">
                      <span className="outfit-name">{outfit.name}</span>
                    </div>
                    <div className='outfit-action-btn'>
                      <span className="field-count">{outfit.fields.length.toString().padStart(2, '0')} Fields</span>
                      <button
                        className="delete-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteOutfitType(outfit.name);
                        }}
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

            </div>

            <div className="outfit-details-panel">
              <div className="panel-header">
                <div className="panel-header-content">
                  <h3>{selectedOutfitType}</h3>
                  <span className="field-count">
                    {outfitTypes.find(o => o.name === selectedOutfitType)?.fields.length.toString().padStart(2, '0')} Fields
                  </span>
                </div>
                <button className="add-subcategory-btn">
                  <FiPlus />
                  Sub Category Add
                </button>
              </div>

              <div className="add-subcategory-form">
                <input
                  type="text"
                  placeholder="Enter Sub Category Name"
                  value={newSubCategory}
                  onChange={(e) => setNewSubCategory(e.target.value)}
                  className="subcategory-input"
                />
                <select
                  value={newSubCategoryUnit}
                  onChange={(e) => setNewSubCategoryUnit(e.target.value)}
                  className="unit-select"
                >
                  {units.map(unit => (
                    <option key={unit} value={unit}>{unit}</option>
                  ))}
                </select>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={newSubCategoryRequired}
                    onChange={(e) => setNewSubCategoryRequired(e.target.checked)}
                  />
                  Required
                </label>
                <button className="add-field-btn" onClick={handleAddSubCategory}>
                  <FiPlus />
                  Add Field
                </button>
              </div>

              <div className="fields-list">
                {outfitTypes.find(o => o.name === selectedOutfitType)?.fields.map((field, index) => (
                  <div
                    key={index}
                    className="field-item subcategory-item"
                    draggable
                    onDragStart={(e) => handleDragStart(e, field)}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => handleDrop(e, field)}
                    onDragEnd={handleDragEnd}
                  >
                    <div className="subcategory-info">
                      <span className="subcategory-name">{field.name}</span>
                    </div>
                    <div className="subcategory-actions">
                      <span className="field-count-badge">{field.unit}</span>
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          checked={field.required}
                          onChange={() => console.log('Toggle required for', field.name)}
                        />
                        Required
                      </label>
                      <button
                        className="delete-btn"
                        onClick={() => handleDeleteField(field.name)}
                      >
                        <FiX />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'Rolls':
        return (
          <div className="rolls-content">
            <div className="rolls-panel">
              <div className="panel-header">
                <div className="panel-header-content">
                  <h3>Worker Roll</h3>
                  <span className="field-count">{workerRolls.length.toString().padStart(2, '0')} Rolls</span>
                </div>
                <button className="add-field-btn" onClick={handleAddRoll}>
                  <FiPlus />
                  Add New Roll
                </button>
              </div>

              <div className="rolls-list">
                {workerRolls.map((roll, index) => (
                  <div
                    key={index}
                    className="roll-item"
                    draggable
                    onDragStart={(e) => handleRollDragStart(e, roll)}
                    onDragOver={handleRollDragOver}
                    onDragLeave={handleRollDragLeave}
                    onDrop={(e) => handleRollDrop(e, roll)}
                    onDragEnd={handleRollDragEnd}
                  >
                    <div className='roll-name-dragicon'>
                      <div className="roll-drag">
                        <FiMenu />
                      </div>
                      <span className="roll-name">{roll.name}</span>
                    </div>
                    <div className="roll-actions">
                      <button
                        className="edit-btn"
                        onClick={() => handleEditRoll(roll.name)}
                      >
                        <FiEdit />
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => handleDeleteRoll(roll.name)}
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <AddRoleModal 
              isOpen={isModalOpen}
              onClose={() => {
                setIsModalOpen(false);
                setEditingRoll(null);
              }}
              onSave={handleSaveRole}
              editingRoll={editingRoll}
            />
          </div>
        );
      default:
        return (
          <div className="tab-placeholder">
            <h3>{activeTab}</h3>
            <p>Content for {activeTab} will be implemented here.</p>
          </div>
        );
    }
  };

  return (
    <div className="settings-page">
      <div className="settings-header">
        <h1>Settings</h1>
      </div>

      <div className="settings-tabs">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="settings-content">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default Settings;
