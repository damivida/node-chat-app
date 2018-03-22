var generateMessage = (from, text) => {
    
    return {
        
        //--reference not es6
        //from:from,
    
        from,
        text,
        createdAt: new Date().getTime()
    };
};

var generateLocationMessage = (from, latitude, longitude) => {
    
    return {
        from,
        url: `https://www.google.com/maps?q=${latitude}, ${longitude}`,
        createdAt: new Date().getTime()
    };
};

module.exports = {generateMessage, generateLocationMessage};