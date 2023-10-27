module.exports = (sequelize, DataTypes) => {
    const JsonDataModel = sequelize.define('csvjson', {
        json_data: {
            type: DataTypes.JSON
        }
    });

    return JsonDataModel;
};