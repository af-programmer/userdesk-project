import pool from '../db.js';

export const getById = async (tableName, id) => {
  const [rows] = await pool.query('SELECT * FROM ?? WHERE id = ?', [tableName, id]);
  return rows[0];
};

export const deleteRecord = async (tableName, id) => {
  const [result] = await pool.query('DELETE FROM ?? WHERE id = ?', [tableName, id]);
  return result.affectedRows;
};

export const updateRecord = async (tableName, id, fields) => {
  const keys = Object.keys(fields).filter(key => fields[key] !== undefined);
  if (keys.length === 0) return 0;
  
  const setClause = keys.map(key => `${key} = COALESCE(?, ${key})`).join(', ');
  const values = keys.map(key => fields[key]);
  
  const [result] = await pool.query(
    `UPDATE ?? SET ${setClause} WHERE id = ?`,
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