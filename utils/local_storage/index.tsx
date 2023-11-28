export class LocalStorage {
	static setTempEmail = async (tempEmail: string) => {
		localStorage.setItem("pending_verification_email", tempEmail);
	};
	static getTempEmail = async () => {
		return localStorage.getItem("pending_verification_email");
	};
	static removeTempEmail = async () => {
		localStorage.removeItem("pending_verification_email");
	};
	
	static resetStorage = async () => {
		localStorage.clear();
	};
}
