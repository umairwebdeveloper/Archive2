"use client";

import React, { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import "grapesjs/dist/css/grapes.min.css";
import gjsPresetWebpage from "grapesjs-preset-webpage";
import grapesjsBlocksBasic from "grapesjs-blocks-basic";
import toast from "react-hot-toast";

interface CourseIdProps {
	courseId: string;
	resumeContent: any;
}

const GrapesJSEditor: React.FC<CourseIdProps> = ({
	courseId,
	resumeContent,
}) => {
	const router = useRouter();
	const editorRef: any = useRef(null);

	useEffect(() => {
		const grapesjs = require("grapesjs");
		const editor = grapesjs.init({
			container: "#gjs",
			fromElement: true,
			width: "auto",
			height: "100vh",
			storageManager: false,
			plugins: [gjsPresetWebpage, grapesjsBlocksBasic],
			pluginsOpts: {
				gjsPresetWebpage: {},
				grapesjsBlocksBasic: {},
			},
			canvas: {
				scripts: [
					"https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js",
				],
				styles: [
					"https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css",
					"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css",
					"https://fonts.googleapis.com/css2?family=Edu+NSW+ACT+Foundation:wght@400..700&family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Reddit+Mono:wght@200..900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap",
				],
			},
		});
		editorRef.current = editor;
		editor.BlockManager.add("div-block", {
			label: "Div Block",
			content: `
                <div>
                </div>
            `,
			category: "Basic",
		});
		editor.Panels.addButton("options", {
			id: "save-btn",
			className: "fa fa-save",
			command: "save-db",
			attributes: { title: "Save" },
		});
		editor.Panels.addButton("options", {
			id: "back-btn",
			className: "fa fa-arrow-left",
			command: "go-back",
			attributes: { title: "Go back" },
		});
		editor.Commands.add("go-back", {
			run: function (editor: any, sender: any) {
				sender && sender.set("active", 0);
				router.back();
			},
		});
		editor.addStyle(resumeContent ? resumeContent.style : "");
		editor.addComponents(resumeContent ? resumeContent.text : "");
		editor.Commands.add("save-db", {
			run: function (editor: any, sender: any) {
				// axios put request
				const putData: any = async (e: any) => {
					try {
						const saveButton = editor.Panels.getButton(
							"options",
							"save-btn"
						);

						// Change button to loading state
						saveButton.set({
							className: "fa fa-spinner fa-spin",
							attributes: { title: "Saving..." },
						});
						const response = await fetch(
							`/api/courses/${courseId}/resume`,
							{
								method: "POST",
								headers: {
									"Content-Type": "application/json",
								},
								body: JSON.stringify({
									content: `<style>${editor.getCss()}</style>${editor.getHtml()}`,
									style: editor.getCss(),
								}),
							}
						);

						if (!response.ok) {
							throw new Error("Failed to save resume");
						}

						toast.success("Resume save successfully!");
					} catch (error) {
						toast.error("Failed to save resume");
					} finally {
						// Revert button back to original state
						const saveButton = editor.Panels.getButton(
							"options",
							"save-btn"
						);
						saveButton.set({
							className: "fa fa-save",
							attributes: { title: "Save" },
						});
					}
				};
				putData();
			},
		});

		return () => {
			editorRef.current && editorRef.current.destroy();
		};
	}, []);

	return <div id="gjs"></div>;
};

export default GrapesJSEditor;
