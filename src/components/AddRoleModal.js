import React, { useState, useEffect } from 'react';

const AddRoleModal = ({ isOpen, onClose, onSave, editingRoll }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    roleDesignation: '',
    userId: '',
    password: '',
    permissions: {
      dashboard: { canView: false, canAddEdit: false },
      orders: { canView: false, canAddEdit: false },
      workers: { canView: false, canAddEdit: false },
      tasks: { canView: false, canAddEdit: false },
      settings: { canView: false, canAddEdit: false }
    }
  });

  // Reset form when modal opens/closes or editingRoll changes
  useEffect(() => {
    console.log('editingRoll:', editingRoll); // Debug log
    if (isOpen) {
      if (editingRoll) {
        // Pre-fill form with editing roll data
        setFormData({
          fullName: editingRoll.name || '',
          roleDesignation: editingRoll.name || '',
          userId: editingRoll.userId || '',
          password: editingRoll.password || '',
          permissions: editingRoll.permissions || {
            dashboard: { canView: false, canAddEdit: false },
            orders: { canView: false, canAddEdit: false },
            workers: { canView: false, canAddEdit: false },
            tasks: { canView: false, canAddEdit: false },
            settings: { canView: false, canAddEdit: false }
          }
        });
      } else {
        // Reset to empty form
        setFormData({
          fullName: '',
          roleDesignation: '',
          userId: '',
          password: '',
          permissions: {
            dashboard: { canView: false, canAddEdit: false },
            orders: { canView: false, canAddEdit: false },
            workers: { canView: false, canAddEdit: false },
            tasks: { canView: false, canAddEdit: false },
            settings: { canView: false, canAddEdit: false }
          }
        });
      }
    }
  }, [isOpen, editingRoll]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePermissionChange = (e) => {
    const { name, checked } = e.target;
    const [section, action] = name.split('.');
    
    setFormData(prev => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [section]: {
          ...prev.permissions[section],
          [action]: checked
        }
      }
    }));
  };

  const handleSave = () => {
    if (formData.fullName && formData.roleDesignation && formData.userId && formData.password) {
      onSave(formData);
      onClose();
      // Reset form
      setFormData({
        fullName: '',
        roleDesignation: '',
        userId: '',
        password: '',
        permissions: {
          dashboard: { canView: false, canAddEdit: false },
          orders: { canView: false, canAddEdit: false },
          workers: { canView: false, canAddEdit: false },
          tasks: { canView: false, canAddEdit: false },
          settings: { canView: false, canAddEdit: false }
        }
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{editingRoll ? 'Edit Roll' : 'Add New Roll'}</h2>
        </div>

        <div className="modal-body">
          <div className="form-section">
            <div className="form-row">
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Enter full name"
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label>Role / Designation</label>
                <input
                  type="text"
                  name="roleDesignation"
                  value={formData.roleDesignation}
                  onChange={handleInputChange}
                  placeholder="Enter role or designation"
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>User ID*</label>
                <input
                  type="text"
                  name="userId"
                  value={formData.userId}
                  onChange={handleInputChange}
                  placeholder="Enter user ID"
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label>Password*</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter password"
                  className="form-input"
                />
              </div>
            </div>
          </div>

          <div className="permissions-section">
            <h3>Permissions</h3>
            <div className="permissions-header">
              <span>Section</span>
              <span>Can View</span>
              <span>Can Add/Edit</span>
            </div>
            <div className="permissions-list">
              {Object.keys(formData.permissions).map((section) => (
                <div className="permission-item" key={section}>
                  <span>{section.charAt(0).toUpperCase() + section.slice(1)}</span>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      name={`${section}.canView`}
                      checked={formData.permissions[section].canView}
                      onChange={handlePermissionChange}
                    />
                    <span className="slider round"></span>
                  </label>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      name={`${section}.canAddEdit`}
                      checked={formData.permissions[section].canAddEdit}
                      onChange={handlePermissionChange}
                    />
                    <span className="slider round"></span>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="cancel-account-btn" onClick={onClose}>Cancel</button>
          <button className="save-account-btn" onClick={handleSave}>Save Account</button>
        </div>
      </div>
    </div>
  );
};

export default AddRoleModal;
