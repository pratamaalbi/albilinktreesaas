import * as linkService from "../services/link.service.js";

// CREATE LINK (PRIVATE)
export const create = async (req, res) => {
  try {
    const link = await linkService.createLink(
      req.user.id,
      req.body.title,
      req.body.url
    );
    res.json(link);
  } catch (err) {
    res.status(500).json({ msg: "Failed to create link" });
  }
};

// GET MY LINKS (PRIVATE)
export const getMyLinks = async (req, res) => {
  try {
    const data = await linkService.getLinksByUser(req.user.id);
    res.json(data);
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch links" });
  }
};

// DELETE LINK (PRIVATE)
export const remove = async (req, res) => {
  try {
    await linkService.deleteLink(req.params.id, req.user.id);
    res.json({ msg: "Deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Failed to delete link" });
  }
};

// 🌐 GET PUBLIC LINKS (TANPA LOGIN)
export const getPublicLinks = async (req, res) => {
  try {
    const { username } = req.params;

    const data = await linkService.getLinksByUsername(username);

    if (!data) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.json(data);
  } catch (err) {
    console.error("ERROR ASLI:", err); // 🔥 ini kunci
    res.status(500).json({ msg: err.message }); // tampilkan error asli
  }
};