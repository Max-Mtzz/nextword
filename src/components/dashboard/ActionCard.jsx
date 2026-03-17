import React from 'react';
import './ActionCard.css';
export const ActionCard = ({ title, icon, onClick }) => (
  <div className="action-card" onClick={onClick}>
    <img src={icon} alt={title} />
    <span>{title}</span>
  </div>
);