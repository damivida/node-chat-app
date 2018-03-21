var generateMessage = (from, text) => {
    
    return {
        
        //--reference not es6
        //from:from,
        
        from,
        text,
        createdAt: new Date().getTime()
    };
};

module.exports = {generateMessage};