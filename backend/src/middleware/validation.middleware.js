const validate = (schema) => async(req, res, next) => {
    try {
        req.validatedData = schema.parse(req.body);
        next();
    } catch (error) {
        return res.status(400).json({
            success: false,
            errors:
                error.issues
        });
    }
}

module.exports = validate;