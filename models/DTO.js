class DTO {

    /**
     * A dictionary of HTTP response status codes and associated default messages.
     */
    static defaultMessages = {
        '200': "Process successful.",
        '201': "Creation successful.",
        '400': "Data invalid.",
        '404': "Data not found.",
        '405': "Method not allowed.",
        '500': "Something went wrong.",

    };

    /**
     * An instance of the DTO class.
     * @param {*} code the HTTP response status code.
     * @param {*} message the user-friendy response message.
     * @param {*} data any data meant to be sent to the client.
     */
    constructor(code, message, data = null) {
        this.code = code;
        this.message = message;
        this.data = data;
    }

    toString = () => {
        return `DTO[code=${code},message=${message},data=${data}]`
    }

    /**
     * Generates a DTO with a default message associated with the given HTTP code. Data can optionally be included if relevant.
     * @param {number} code the HTTP response status code.
     * @param {any} data any data to be sent to the client.
     * @returns an instance of the DTO class.
     */
    static default = (code, data = null) => {

        const key = String(code);

        const defaultMsg = this.defaultMessages[key];

        if (defaultMsg) {
            return new DTO(code, defaultMsg, data);
        }
        else {
            throw Error(`Failed to map code ${code} to message.`);
        }

    };

}

module.exports = DTO;