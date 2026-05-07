import asyncHandler from './asyncHandler.js';

export const createController = (methods, entityName, options = {}) => ({
  
  getAll: options.customGetAll || asyncHandler(async (req, res) => {
    const items = await methods.getByUserId(req.user.id, req.query);
    res.json(items);
  }),

  getById: asyncHandler(async (req, res) => {
    const item = await methods.getById(req.params.id);
    if (!item) return res.status(404).json({ error: `${entityName} not found` });
    res.json(item);
  }),

  create: asyncHandler(async (req, res) => {
    const id = await methods.create({ user_id: req.user.id, ...req.body });
    res.status(201).json({ id, message: `${entityName} created successfully` });
  }),

  update: asyncHandler(async (req, res) => {
    const item = await methods.getById(req.params.id);
    if (!item) return res.status(404).json({ error: `${entityName} not found` });
    if (item.user_id !== req.user.id) return res.status(403).json({ error: 'Forbidden' });
    await methods.update(req.params.id, req.body);
    res.json({ message: `${entityName} updated successfully` });
  }),

  remove: asyncHandler(async (req, res) => {
    const item = await methods.getById(req.params.id);
    if (!item) return res.status(404).json({ error: `${entityName} not found` });
    if (item.user_id !== req.user.id) return res.status(403).json({ error: 'Forbidden' });
    await methods.remove(req.params.id);
    res.json({ message: `${entityName} deleted successfully` });
  })
});