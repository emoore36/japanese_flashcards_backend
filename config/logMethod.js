const withLogging = (method, serviceName) => {

    return async (...args) => {

        console.log(`Entering ${serviceName} ${method.name}() with data:`, args);

        try {
            const result = await method.apply(this, args);
            console.log(`Leaving ${serviceName} ${method.name}() with result:`, result);
            return result;
        } catch (err) {
            console.error(`Error in ${serviceName} ${method.name}(): ${err}`);
            throw err;
        }
    }
}

module.exports = { withLogging };