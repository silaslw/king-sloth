class DataStorage {
    constructor() {
        this.records = [];
    }

    save(data) {
        this.records.push(data);
        console.log(`[Storage] Saved record for ID: ${data.id}`);
    }

    exportJSON() {
        return JSON.stringify(this.records, null, 2);
    }
}

class DOMManipulator {
    async clickRow(rowId) {
        const row = document.getElementById(`row${rowId}`);
        if (!row) throw new Error(`Row not found: ${rowId}`);
        
        row.click();
        // Wait for modal/details to render
        await new Promise(resolve => setTimeout(resolve, 1500));
    }

    async closeDetails() {
        // Close modal or reset view if necessary
        const closeBtn = document.querySelector('.modal-close-btn, .close-button');
        if (closeBtn) {
            closeBtn.click();
            await new Promise(resolve => setTimeout(resolve, 500));
        }
    }
}

class Verifier {
    constructor(storage, manipulator) {
        this.storage = storage;
        this.manipulator = manipulator;
    }

    async run() {
        console.log("[Verifier] Starting initial external scan...");
        const rows = document.querySelectorAll('tr[id^="row"]');

        for (const tr of rows) {
            // External verification (fast, no DOM manipulation yet)
            const tipoElement = tr.querySelector('[data-tipo]');
            const dataTipo = tipoElement ? tipoElement.getAttribute('data-tipo') : '';

            if (dataTipo !== 'cliente') continue; // Skip if not matching rule

            const id = tr.id.replace('row', '');
            const axisCell = tr.querySelector('[axis="37"]');
            const axis_37 = axisCell ? axisCell.textContent.trim() : '';

            // --- INTERNAL VERIFICATION STEP ---
            // If we need deeper variables inside the opened row/modal:
            let internalData = {};
            try {
                // Step 1: Use DOM Manipulator to open/navigate
                await this.manipulator.clickRow(id);

                // Step 2: Extract hidden/inner variables now that DOM is updated
                const deepField = document.querySelector('.some-inner-detail-class');
                internalData = {
                    deepValue: deepField ? deepField.textContent.trim() : 'N/A'
                };

                // Step 3: Close the view to reset state for the next loop
                await this.manipulator.closeDetails();

            } catch (error) {
                console.error(`[Verifier] Error processing row ${id}:`, error);
            }

            // --- STORAGE & JSONFY STEP ---
            const compiledRecord = {
                id,
                data_tipo: dataTipo,
                axis_37,
                ...internalData,
                timestamp: new Date().toISOString()
            };

            this.storage.save(compiledRecord);
        }

        // Final JSON export
        console.log("--- FINAL JSON EXPORT ---");
        console.log(this.storage.exportJSON());
    }
}

const storage = new DataStorage();
const manipulator = new DOMManipulator();
const verifier = new Verifier(storage, manipulator);
verifier.run();