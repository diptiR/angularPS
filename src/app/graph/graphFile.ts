import { Injectable } from "@angular/core";

@Injectable({"providedIn":"root"})
export class GraphService {
    getGraphJson(): any {
        return {
            "nodes": [
                { "name": "node1", "group": 1 },
                { "name": "node2", "group": 2 },
                { "name": "node3", "group": 2 },
                { "name": "node4", "group": 3 }
            ],
            "links": [
                { "source": 2, "target": 1, "weight": 3 },
                { "source": 0, "target": 2, "weight": 3 }
            ]
        }
    }
}