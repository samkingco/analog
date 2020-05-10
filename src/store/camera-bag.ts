import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Dispatch, AppState } from "./";
import { uuid } from "../util/uuid";

export interface Camera {
  id: string;
  name: string;
  numberOfFrames: number;
  lensIds: CameraLens["id"][];
}

export interface CameraLens {
  id: string;
  name: string;
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
  tempCamera: Camera;
  tempCameraLens: CameraLens;
}

const blankCamera: Camera = {
  id: "camera_blank",
  name: "",
  numberOfFrames: 0,
  lensIds: [],
};

const blankCameraLens: CameraLens = {
  id: "lens_blank",
  name: "",
  minFocalLength: 0,
  maxFocalLength: 0,
  minAperture: 0,
  maxAperture: 0,
};

const initialState: CameraBagState = {
  tempCamera: blankCamera,
  tempCameraLens: blankCameraLens,
  cameras: {
    cam_1: {
      id: "cam_1",
      name: "Hasselblad 500C/M",
      numberOfFrames: 12,
      lensIds: ["lens_1", "lens_5"],
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
      name: "Mamiya 80-150mm f/4",
      minFocalLength: 80,
      maxFocalLength: 150,
      minAperture: 4,
      maxAperture: 22,
    },
    lens_4: {
      id: "lens_4",
      name: "Mamiya 100-200mm f/4.5",
      minFocalLength: 100,
      maxFocalLength: 200,
      minAperture: 4.5,
      maxAperture: 22,
    },
    lens_5: {
      id: "lens_5",
      name: "Zoom boi",
      minFocalLength: 24,
      maxFocalLength: 70,
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
    resetTempCameraLens: (state) => {
      state.tempCameraLens = blankCameraLens;
    },
    updateTempCameraLens: (
      state,
      action: PayloadAction<Partial<CameraLens>>,
    ) => {
      state.tempCameraLens = {
        ...state.tempCameraLens,
        ...action.payload,
      };
    },
    saveTempCameraLens: (
      state,
      action: PayloadAction<{ cameraId?: string }>,
    ) => {
      const cameraId = action.payload.cameraId;
      const lensId = uuid("lens");
      state.cameraLenses[lensId] = {
        ...state.tempCameraLens,
        id: lensId,
        maxFocalLength:
          state.tempCameraLens.maxFocalLength > 0
            ? state.tempCameraLens.maxFocalLength
            : state.tempCameraLens.minFocalLength,
      };

      if (cameraId) {
        state.cameras[cameraId].lensIds = [
          ...state.cameras[cameraId].lensIds,
          lensId,
        ];
      }

      state.tempCameraLens = blankCameraLens;
    },
    updateLens: (
      state,
      action: PayloadAction<{ lens: Partial<CameraLens> }>,
    ) => {
      const lensId = action.payload.lens.id;
      if (!lensId) {
        return;
      }
      if (state.cameraLenses[lensId]) {
        state.cameraLenses[lensId] = {
          ...state.cameraLenses[lensId],
          ...action.payload.lens,
        };
      }
    },
  },
});

export function reset() {
  return function (dispatch: Dispatch) {
    dispatch(actions.reset());
  };
}

export function resetTempCameraLens() {
  return function (dispatch: Dispatch) {
    dispatch(actions.resetTempCameraLens());
  };
}

export function updateTempCameraLens(lens: Partial<CameraLens>) {
  return function (dispatch: Dispatch) {
    dispatch(actions.updateTempCameraLens(lens));
  };
}

export function saveTempCameraLens(cameraId?: string) {
  return function (dispatch: Dispatch) {
    dispatch(actions.saveTempCameraLens({ cameraId }));
  };
}

export function updateLens(lens: Partial<CameraLens>) {
  return function (dispatch: Dispatch) {
    dispatch(actions.updateLens({ lens }));
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

function lensById(state: AppState, id: string): CameraLens | undefined {
  return state.cameraBag.cameraLenses[id];
}

function lensesList(state: AppState): CameraLens[] {
  const list = [];
  for (const id of Object.keys(state.cameraBag.cameraLenses)) {
    const result = lensById(state, id);
    if (result) {
      list.push(result);
    }
  }
  return list;
}

function lensesForCamera(state: AppState, cameraId: string): CameraLens[] {
  const list = [];
  const camera = cameraById(state, cameraId);

  if (camera) {
    for (const id of camera.lensIds) {
      const result = lensById(state, id);
      if (result) {
        list.push(result);
      }
    }
  }
  return list;
}

function tempCameraLens(state: AppState): CameraLens {
  return state.cameraBag.tempCameraLens;
}

export const cameraBagSelectors = {
  cameraById,
  camerasList,
  lensById,
  lensesList,
  lensesForCamera,
  tempCameraLens,
};
