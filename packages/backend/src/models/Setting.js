// Sequelize Models for Linktree Backend

const { Model } = require("sequelize")

module.exports = (sequelize, DataTypes) => {
	

	class Setting extends Model {
		static associate(models) {
			Setting.belongsTo(models.User, { foreignKey: "user_id" })
		}
	}
	Setting.init(
		{
			setting_id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true
			},
			user_id: DataTypes.UUID,
			theme: { type: DataTypes.STRING, defaultValue: "light" },
			background_color: {
				type: DataTypes.STRING,
				defaultValue: "#FFFFFF"
			},
			button_style: { type: DataTypes.STRING, defaultValue: "rounded" },
			show_branding: { type: DataTypes.BOOLEAN, defaultValue: true }
		},
		{
			sequelize,
			modelName: "Setting",
			underscored: true
		}
	)

	return  Setting 
}
