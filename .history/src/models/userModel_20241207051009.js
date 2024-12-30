import mongoose from "mongoose";
import bcryptjs from "bcryptjs";

const userSchema = new mongoose.Schema({
nameUser: { type: String, required: true},
email: { type: String, required: true, unique: true },
password: { type: String, required: true },
role: { type: String, default: "user" },
});

userSchema.pre("save", async function (next) {
if (!this.isModified("password")) return next();
this.password = await bcryptjs.hash(this.password, 10);
next();
});

userSchema.methods.matchPassword = async function (password) {
return await bcryptjs.compare(password, this.password);
};

const UserDef = mongoose.model("User", userSchema);

export default UserDef;