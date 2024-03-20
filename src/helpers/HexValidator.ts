const hexValidator = (hexValue: string) => {
    const validate = /^#?([a-f0-9]{6}|[a-f0-9]{3})$/;
    if (validate.test(hexValue))
        return hexValue;
    else
        throw "Аргумент hexValue не является hex";

}

export default hexValidator;
