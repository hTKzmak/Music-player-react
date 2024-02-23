import { useEffect, useState } from "react";
import useSound from "use-sound"; //для работы со звуком
import path from "../assets/path.mp4"; // импорт музыки

function Test() {

    const [vol, setVol] = useState(0)

    return (
        <div>
            <input
                type="range"
                min="0"
                value={vol}
                default="0"
                className="volumeTest"
                onChange={(e) => setVol(e.target.value)}
            />
            <p>Volume: {vol}</p>
        </div>
    );
}

export default Test