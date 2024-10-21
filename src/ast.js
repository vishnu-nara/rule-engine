class Node {
    constructor(type, value = null, left = null, right = null) {
        this.type = type;
        this.value = value;
        this.left = left;
        this.right = right; 
    }
}

const createRule = (ruleString) => {
    const parts = ruleString.split(' '); // Basic parsing
    const leftOperand = parts[0].replace(/"/g, '').trim(); // Remove quotes
    const operator = parts[1];
    const rightOperand = parseInt(parts[2], 10);
    
    return new Node("operator", operator, 
        new Node("operand", leftOperand), 
        new Node("operand", rightOperand));
};


const combineRules = (rules) => {
    if (rules.length === 0) return null;

    let combined = rules[0];

    for (let i = 1; i < rules.length; i++) {
        const nextRule = rules[i];
        combined = new Node("operator", "OR", combined, nextRule);
    }

    return combined;
};


const evaluateRule = (node, data) => {
    if (!node) {
        throw new Error("Node is undefined");
    }

    if (typeof node !== 'object') {
        throw new Error(`Invalid node: ${JSON.stringify(node)}`);
    }

    if (!node.type) {
        throw new Error(`Node type is undefined: ${JSON.stringify(node)}`);
    }

    if (node.type === "operand") {
        return evaluateOperand(node, data);
    } else if (node.type === "operator") {
        return evaluateOperator(node, data);
    }
    
    throw new Error(`Unknown node type: ${node.type}`);
};

const evaluateOperand = (node, data) => {
    const value = data[node.value];
    return value !== undefined ? value : node.value; 
};

const evaluateOperator = (node, data) => {
    const leftResult = evaluateRule(node.left, data);
    const rightResult = evaluateRule(node.right, data);

    console.log(`Evaluating: ${leftResult} ${node.value} ${rightResult}`);

    switch (node.value) {
        case ">":
            return leftResult > rightResult;
        case "<":
            return leftResult < rightResult;
        case "AND":
            return leftResult && rightResult;
        case "OR":
            return leftResult || rightResult;
        default:
            throw new Error(`Unknown operator: ${node.value}`);
    }
};

module.exports = { Node, createRule, combineRules, evaluateRule };