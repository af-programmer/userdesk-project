import pool from '../db.js';

export const getById = async (tableName, id) => {
  const [rows] = await pool.query('SELECT * FROM ?? WHERE id = ? AND is_deleted = 0', [tableName, id]);
  return rows[0];
};

export const deleteRecord = async (tableName, id) => {
  const [result] = await pool.query('UPDATE ?? SET is_deleted = 1 WHERE id = ?', [tableName, id]);
  return result.affectedRows;
};

export const hardDeleteRecord = async (tableName, id) => {
  const [result] = await pool.query('DELETE FROM ?? WHERE id = ?', [tableName, id]);
  return result.affectedRows;
};

export const restoreRecord = async (tableName, id) => {
  const [result] = await pool.query('UPDATE ?? SET is_deleted = 0 WHERE id = ?', [tableName, id]);
  return result.affectedRows;
};

export const updateRecord = async (tableName, id, fields) => {
  const keys = Object.keys(fields).filter(key => fields[key] !== undefined);
  if (keys.length === 0) return 0;
  
  const setClause = keys.map(key => `${key} = ?`).join(', ');
  const values = keys.map(key => fields[key]);
  
  const [result] = await pool.query(
    `UPDATE ?? SET ${setClause} WHERE id = ? AND is_deleted = 0`,
    [tableName, ...values, id]
  );
  return result.affectedRows;
};

export const createRecord = async (tableName, fields) => {
  const keys = Object.keys(fields);
  const placeholders = keys.map(() => '?').join(', ');
  const values = keys.map(key => fields[key]);
  
  const [result] = await pool.query(
    `INSERT INTO ?? (${keys.join(', ')}) VALUES (${placeholders})`,
    [tableName, ...values]
  );
  return result.insertId;
};