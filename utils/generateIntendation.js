exports.generateIndentation  = (depth, itemToIntend)=> {
    return '\t'.repeat(depth)+itemToIntend; // Generate tabs based on the depth
}