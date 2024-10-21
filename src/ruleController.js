const express = require('express');
const bodyParser = require('body-parser');
const { createRule, combineRules, evaluateRule, evaluateAst } = require('./ast');
const { addRule, getRules } = require('./database');

const router = express.Router();
router.use(bodyParser.json());

router.post('/create_rule', async (req, res) => {
    const ruleString = req.body.rule_string;
    const ruleNode = createRule(ruleString);
    const ruleId = await addRule(ruleString, ruleNode);
    res.json({ id: ruleId, rule: ruleNode }); 
});

router.post('/combine_rules', async (req, res) => {
    const ruleIds = req.body.rule_ids;
    const rules = await getRules(ruleIds); // Fetch rules by IDs
    const combinedNode = combineRules(rules);
    res.json(combinedNode); // Return the combined AST
});

router.post('/evaluate_rule', async (req, res) => {
    const { rule_id, data } = req.body;

    const rules = await getRules([rule_id]);
    console.log("Fetched rules:", rules); // Log the fetched rules for debugging

    if (rules.length === 0) {
        return res.status(404).json({ error: "Rule not found" });
    }

    const rule = rules[0]; // Get the first rule
    if (!rule.ast) {
        return res.status(500).json({ error: "AST not found for the rule." });
    }

    try {
        const result = evaluateRule(rule.ast, data);
        res.json({ result }); // Return the evaluation result
    } catch (error) {
        console.error("Error evaluating rule:", error); // Log the error
        res.status(500).json({ error: "Evaluation failed." });
    }
});

router.post('/evaluate_ast', (req, res) => {
    const { ast, data } = req.body;

    try {
        const result = evaluateRule(ast, data);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


router.get('/get_rules', async (req, res) => {
    const rules = await getRules(); // Fetch all rules
    res.json(rules); // Return the list of all rules
});

module.exports = router;
