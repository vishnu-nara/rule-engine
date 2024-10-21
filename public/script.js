const API_URL = 'http://localhost:3000/api';

async function createRule() {
    const ruleString = document.getElementById('ruleString').value;
    const response = await fetch(`${API_URL}/create_rule`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ rule_string: ruleString })
    });
    const result = await response.json();
    document.getElementById('createdRule').innerText = `Rule Created: ${JSON.stringify(result)}`;
    loadAllRules(); // Refresh the list of all rules
}

async function combineRules() {
    const ruleIds = document.getElementById('rulesList').value.split('\n').filter(Boolean);
    const response = await fetch(`${API_URL}/combine_rules`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ rule_ids: ruleIds })
    });
    const result = await response.json();
    document.getElementById('combinedRule').innerText = `Combined Rule AST: ${JSON.stringify(result)}`;
}

async function evaluateRule() {
    const ruleId = document.getElementById('ruleId').value;
    const dataInput = document.getElementById('dataInput').value;

    const response = await fetch(`${API_URL}/evaluate_rule`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ rule_id: ruleId, data: JSON.parse(dataInput) })
    });
    const result = await response.json();
    document.getElementById('evaluationResult').innerText = `Evaluation Result: ${result.result}`;
}

async function evaluateAst() {
    const astInput = document.getElementById('astInput').value;
    const astDataInput = document.getElementById('astDataInput').value;

    try {
        const response = await fetch(`${API_URL}/evaluate_ast`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ast: JSON.parse(astInput), data: JSON.parse(astDataInput) })
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        document.getElementById('astEvaluationResult').innerText = `Evaluation Result: ${result.result}`;
    } catch (error) {
        document.getElementById('astEvaluationResult').innerText = `Error: ${error.message}`;
    }
}

async function loadAllRules() {
    const response = await fetch(`${API_URL}/get_rules`);
    const rules = await response.json();
    const rulesHtml = rules.map(rule => `ID: ${rule.id}, Rule: ${rule.rule_string}`).join('<br/>');
    document.getElementById('allRules').innerHTML = rulesHtml;
}

// Load rules on page load
window.onload = loadAllRules;
