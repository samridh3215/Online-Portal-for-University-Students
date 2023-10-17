exports.generateIndentation  = (depth, itemToIntend)=> {
    return '.'.repeat(4*depth)+'\t'+itemToIntend; // Generate tabs based on the depth
}

