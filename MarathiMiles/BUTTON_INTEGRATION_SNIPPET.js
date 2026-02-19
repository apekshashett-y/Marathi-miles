// ========================================================
// BUTTON INTEGRATION SNIPPET
// ========================================================
// Location: src/components/Passport/PastPort.jsx
// Lines: 586-596 and 666-673

// 1. IMPORT AT TOP OF FILE (Already Done)
import Shivneri360Viewer from "../Shivneri360Viewer";
import { useRouteOptional } from "../../context/RouteContext";

// 2. STATE MANAGEMENT (Already Exists)
const [show360Modal, setShow360Modal] = useState(false);
const routeCtx = useRouteOptional();

// 3. BUTTON THAT TRIGGERS THE VIEWER (Already Exists - No Changes Needed)
<button
    type="button"
    className="immersive-view-badge immersive-view-badge-btn"
    onClick={() => {
        routeCtx?.setCurrentFortId?.(selectedFort?.id === 1 ? 'shivneri' : selectedFort?.id || 'shivneri');
        setShow360Modal(true);  // ← This opens the viewer
    }}
    aria-label="Open 360° Interactive View"
>
    360° Interactive View
</button>

// 4. MODAL RENDERING (Updated to Use New Component)
{
    show360Modal && (
        <Shivneri360Viewer
            onClose={() => setShow360Modal(false)}
            addLocationToRoute={routeCtx ? (id) => routeCtx.addLocation(id, "Shivai Temple") : undefined}
        />
    )
}

// ========================================================
// THAT'S IT! The integration is complete.
// ========================================================
//
// The existing button now opens a REAL 360 viewer instead of
// the old static modal. No changes to the button itself were
// needed - we just swapped the modal component.
// ========================================================
