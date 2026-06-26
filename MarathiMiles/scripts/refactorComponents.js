// scripts/refactorComponents.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const shivneriPath = path.resolve(__dirname, '../src/components/Passport/SmartExplorationV2.jsx');
const raigadPath = path.resolve(__dirname, '../src/components/Passport/RaigadSmartExplorationV2.jsx');

function refactorFile(filePath, fortId, importName, locName, edgeName, metaName) {
    console.log(`🛠️ Refactoring: ${filePath}`);
    let content = fs.readFileSync(filePath, 'utf8').replace(/\r\n/g, '\n');

    // 1. Refactor imports (checking if not already refactored)
    const oldImport = `import { ${locName}, ${edgeName}, ${metaName} } from '../../data/${importName}.js';`;
    const newImport = `import { ${locName} as staticLocs, ${edgeName} as staticEdges, ${metaName} as staticMeta } from '../../data/${importName}.js';\nimport { fetchSmartExplorationGraph } from '../../services/supabaseService.js';`;
    
    if (content.includes(oldImport)) {
        content = content.replace(oldImport, newImport);
    } else if (content.includes(`staticLocs`) && content.includes(`fetchSmartExplorationGraph`)) {
        console.log(`Imports already refactored in ${filePath}`);
    } else {
        console.warn(`Could not find exact import line in ${filePath}`);
    }

    // 2. Add state and hook (checking if not already added)
    const stateAnchor = `    const [isComputing, setIsComputing] = useState(false);\n    const [optimizationResult, setOptimizationResult] = useState(null);\n    const [alternatives, setAlternatives] = useState(null);`;

    const stateInjection = `${stateAnchor}

    const [fortLocations, setFortLocations] = useState(staticLocs);
    const [graphEdges, setGraphEdges] = useState(staticEdges);
    const [fortMetadata, setFortMetadata] = useState(staticMeta);

    useEffect(() => {
        async function loadGraph() {
            try {
                const data = await fetchSmartExplorationGraph(${fortId});
                if (data && Object.keys(data.fortLocations).length > 0) {
                    setFortLocations(data.fortLocations);
                    setGraphEdges(data.fortEdges);
                    setFortMetadata(data.fortMetadata);
                }
            } catch (err) {
                console.warn("Failed to load graph from Supabase, using static data:", err);
            }
        }
        loadGraph();
    }, []);`;

    if (content.includes('const [fortLocations, setFortLocations]')) {
        console.log(`State hooks already injected in ${filePath}`);
    } else if (content.includes(stateAnchor)) {
        content = content.replace(stateAnchor, stateInjection);
    } else {
        console.warn(`Could not find state hook anchor in ${filePath}`);
    }

    // 3. Replace all remaining occurrences of variables (checking if not already done)
    const locRegex = new RegExp(`\\b${locName}\\b`, 'g');
    const edgeRegex = new RegExp(`\\b${edgeName}\\b`, 'g');
    const metaRegex = new RegExp(`\\b${metaName}\\b`, 'g');

    content = content.replace(locRegex, 'fortLocations');
    content = content.replace(edgeRegex, 'graphEdges');
    content = content.replace(metaRegex, 'fortMetadata');

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Completed refactoring for ${filePath}`);
}

try {
    refactorFile(
        shivneriPath,
        1,
        'shivneriFortData',
        'shivneriFortLocations',
        'shivneriGraphEdges',
        'shivneriFortMetadata'
    );

    refactorFile(
        raigadPath,
        2,
        'raigadFortData',
        'raigadFortLocations',
        'raigadGraphEdges',
        'raigadFortMetadata'
    );
} catch (err) {
    console.error('Refactoring script failed:', err);
}
