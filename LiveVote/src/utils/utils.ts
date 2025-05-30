/* eslint-disable @typescript-eslint/no-explicit-any */
import QRCode from "qrcode";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import pkg from "../../package.json";
import { Proposal } from "./interfaces";

export function shortenAddress(str = "") {
	return `${str.slice(0, 6)}...${str.slice(str.length - 4)}`;
}

export function shorten(str: string, key?: any): string {
	if (!str) return str;
	let limit;
	if (typeof key === "number") limit = key;
	if (key === "symbol") limit = 6;
	if (key === "name") limit = 64;
	if (key === "choice") limit = 12;
	if (limit)
		return str.length > limit ? `${str.slice(0, limit).trim()}...` : str;
	return shortenAddress(str);
}

export function lsSet(key: string, value: any) {
	return localStorage.setItem(`${pkg.name}.${key}`, JSON.stringify(value));
}

export function lsGet(key: string, fallback?: any) {
	const item = localStorage.getItem(`${pkg.name}.${key}`);
	return jsonParse(item, fallback);
}

export function jsonParse(input: any, fallback?: any) {
	if (typeof input !== "string") {
		return fallback || {};
	}
	try {
		return JSON.parse(input);
	} catch (err) {
		console.log(err);
		return fallback || {};
	}
}

export function fileToBase64(file: File): Promise<string> {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);

		reader.onload = () => {
			if (reader.result) {
				resolve(reader.result.toString()); // Base64 string
			} else {
				reject("Could not convert file to Base64");
			}
		};

		reader.onerror = (error) => {
			reject(error);
		};
	});
}

export function getChoiceString(proposal: Proposal, choiceId: string) {
	// Find the choice with the matching choiceId
	const choice = proposal.choices.find((c) => c.choiceId === choiceId);

	// Return the name if the choice is found, otherwise return a fallback
	return choice ? choice.name : "Unknown Choice";
}

//----------------------------------------------Generate QR Code PNG Folder----------------------------------------------
export async function downloadQRCodes(qrStrings: string[]) {
	const zip = new JSZip();
	const qrFolder = zip.folder("qrcodes");

	if (!qrFolder) return;

	// Generate and add each QR code to the zip folder
	for (let i = 0; i < qrStrings.length; i++) {
		const qrString = qrStrings[i];
		try {
			const qrDataURL = await QRCode.toDataURL(qrString); // Generate QR code as Data URL
			const base64Data = qrDataURL.replace(/^data:image\/png;base64,/, ""); // Strip Data URL prefix
			qrFolder.file(`${i + 1}.png`, base64Data, { base64: true }); // Use index + 1 as file name
		} catch (error) {
			console.error(`Error generating QR code for ${qrString}:`, error);
		}
	}

	// Generate zip file and trigger download
	const content = await zip.generateAsync({ type: "blob" }); // Await the zip file generation
	saveAs(content, "QRCodeFolder.zip"); // Trigger the download
}
