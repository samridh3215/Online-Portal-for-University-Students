exports.generateIndentation  = (depth, itemToIntend)=> {
    return '|'+'-'.repeat(3*depth)+'>\t'+itemToIntend; // Generate tabs based on the depth
}

