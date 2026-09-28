const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());

const floods = require("./floods");
const energy = require("./energy");

// =========================
// FLOOD MONITORING API
// =========================

// GET all flood records
app.get("/floods", (req, res) => {
    res.json(floods);
});

// GET flood record by ID
app.get("/floods/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const flood = floods.find(item => item.id === id);

    if (!flood) {
        return res.status(404).json({
            message: "Flood record not found"
        });
    }

    res.json(flood);
});

// POST new flood record
app.post("/floods", (req, res) => {
    const newFlood = {
        id: floods.length + 1,
        ...req.body
    };

    floods.push(newFlood);

    res.status(201).json(newFlood);
});

// PUT update flood record
app.put("/floods/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = floods.findIndex(item => item.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "Flood record not found"
        });
    }

    floods[index] = {
        id: id,
        ...req.body
    };

    res.json(floods[index]);
});

// DELETE flood record
app.delete("/floods/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = floods.findIndex(item => item.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "Flood record not found"
        });
    }

    const deletedFlood = floods.splice(index, 1);

    res.json({
        message: "Flood record deleted",
        data: deletedFlood[0]
    });
});


// =========================
// ENERGY MONITORING API
// =========================

// GET all energy records
app.get("/energy", (req, res) => {
    res.json(energy);
});

// GET energy record by ID
app.get("/energy/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const record = energy.find(item => item.id === id);

    if (!record) {
        return res.status(404).json({
            message: "Energy record not found"
        });
    }

    res.json(record);
});

// POST new energy record
app.post("/energy", (req, res) => {
    const newEnergy = {
        id: energy.length + 1,
        ...req.body
    };

    energy.push(newEnergy);

    res.status(201).json(newEnergy);
});

// PUT update energy record
app.put("/energy/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = energy.findIndex(item => item.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "Energy record not found"
        });
    }

    energy[index] = {
        id: id,
        ...req.body
    };

    res.json(energy[index]);
});

// DELETE energy record
app.delete("/energy/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = energy.findIndex(item => item.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "Energy record not found"
        });
    }

    const deletedEnergy = energy.splice(index, 1);

    res.json({
        message: "Energy record deleted",
        data: deletedEnergy[0]
    });
});


// =========================
// ROOT ENDPOINT
// =========================

app.get("/", (req, res) => {
    res.json({
        system: "SOLARIS REST API",
        modules: [
            "Flood Monitoring",
            "Energy Monitoring"
        ],
        status: "Running"
    });
});


// =========================
// START SERVER
// =========================

app.listen(PORT, () => {
    console.log("SOLARIS REST API running at http://localhost:" + PORT);
});
