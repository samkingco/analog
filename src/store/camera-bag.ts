import { createSlice } from "@reduxjs/toolkit";
import { Dispatch, AppState } from "./";

export interface Camera {
  id: string;
  name: string;
  numberOfFrames: number;
  lensIds: CameraLens["id"][];
}

export interface CameraLens {
  id: string;
  name?: string;
  minFocalLength: number;
  maxFocalLength: number;
  minAperture: number;
  maxAperture: number;
}

interface CameraBagState {
  cameras: {
    [id: string]: Camera;
  };
  cameraLenses: {
    [id: string]: CameraLens;
  };
}

const initialState: CameraBagState = {
  cameras: {
    cam_1: {
      id: "cam_1",
      name: "Hasselblad 500C/M",
      numberOfFrames: 12,
      lensIds: ["lens_1"],
    },
    cam_2: {
      id: "cam_2",
      name: "Mamiya 7",
      numberOfFrames: 10,
      lensIds: ["lens_2", "lens_3", "lens_4"],
    },
  },
  cameraLenses: {
    lens_1: {
      id: "lens_1",
      name: "Hasselblad 80mm f/2.8 CF",
      minFocalLength: 80,
      maxFocalLength: 80,
      minAperture: 2.8,
      maxAperture: 22,
    },
    lens_2: {
      id: "lens_2",
      name: "Mamiya 43mm f/4.5",
      minFocalLength: 43,
      maxFocalLength: 43,
      minAperture: 4.5,
      maxAperture: 22,
    },
    lens_3: {
      id: "lens_3",
      name: "Mamiya 80mm f/4",
      minFocalLength: 80,
      maxFocalLength: 80,
      minAperture: 4,
      maxAperture: 22,
    },
    lens_4: {
      id: "lens_4",
      name: "Mamiya 150mm f/4.5",
      minFocalLength: 150,
      maxFocalLength: 150,
      minAperture: 4.5,
      maxAperture: 22,
    },
  },
};

export const { actions, reducer } = createSlice({
  name: "cameraBag",
  initialState,
  reducers: {
    reset: () => initialState,
  },
});

export function reset() {
  return function (dispatch: Dispatch) {
    dispatch(actions.reset());
  };
}

function cameraById(state: AppState, id: string): Camera | undefined {
  return state.cameraBag.cameras[id];
}

function camerasList(state: AppState): Camera[] {
  const list = [];
  for (const id of Object.keys(state.cameraBag.cameras)) {
    const result = cameraById(state, id);
    if (result) {
      list.push(result);
    }
  }
  return list;
}

export const cameraBagSelectors = {
  cameraById,
  camerasList,
};
