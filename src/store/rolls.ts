import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Dispatch, AppState } from ".";
import { Camera, cameraBagSelectors, CameraLens } from "./camera-bag";
import { FilmStock } from "./film-stock-database";
import { filmStockSelectors } from "./film-stocks";
import { uuid } from "../util/uuid";

export interface Roll {
  id: string;
  filmStockId: FilmStock["id"];
  cameraId: Camera["id"];
  frames: {
    [id: string]: Frame;
  };
  framesOrder: Frame["id"][];
  maxFrameCount: number;
  dateLoaded: number;
  dateCompleted?: number;
  dateProcessed?: number;
  notes?: string;
}

export interface ComputedRoll extends Roll {
  filmStockName: string;
  cameraName: string;
  framesTaken: number;
  isComplete: boolean;
  isProcessed: boolean;
}

export interface Frame {
  id: string;
  lensId: CameraLens["id"];
  captureTime: number;
  focalLength: number;
  aperture: number;
  shutterWhole: number;
  shutterFraction: number;
  notes?: string;
}

interface FilmLogState {
  rolls: {
    [id: string]: Roll;
  };
  tempRoll: Roll;
}

const blankRoll: Roll = {
  id: "roll_blank",
  filmStockId: "",
  cameraId: "",
  frames: {},
  framesOrder: [],
  maxFrameCount: 0,
  dateLoaded: Date.now(),
};

const initialState: FilmLogState = {
  tempRoll: blankRoll,
  rolls: {
    roll_1: {
      id: "roll_1",
      filmStockId: "kodak-portra-400",
      cameraId: "cam_1",
      frames: {
        frame_1: {
          id: "frame_1",
          lensId: "lens_1",
          captureTime: Date.now(),
          focalLength: 80,
          aperture: 2.8,
          shutterWhole: 1,
          shutterFraction: 250,
          notes: "A really cool reflection",
        },
        frame_2: {
          id: "frame_2",
          lensId: "lens_1",
          captureTime: Date.now(),
          focalLength: 80,
          aperture: 4,
          shutterWhole: 1,
          shutterFraction: 250,
        },
      },
      framesOrder: ["frame_1", "frame_2"],
      maxFrameCount: 12,
      dateLoaded: Date.now(),
    },
    roll_2: {
      id: "roll_2",
      filmStockId: "kodak-t-max-400",
      cameraId: "cam_2",
      frames: {},
      framesOrder: [],
      maxFrameCount: 12,
      dateLoaded: Date.now(),
    },
    roll_3: {
      id: "roll_3",
      filmStockId: "kodak-portra-400",
      cameraId: "cam_1",
      frames: {},
      framesOrder: [
        "frame_1",
        "frame_1",
        "frame_1",
        "frame_1",
        "frame_1",
        "frame_1",
        "frame_1",
        "frame_1",
        "frame_1",
        "frame_1",
        "frame_1",
        "frame_1",
      ],
      maxFrameCount: 12,
      dateLoaded: Date.now(),
      dateCompleted: Date.now(),
    },
    roll_4: {
      id: "roll_4",
      filmStockId: "kodak-portra-400",
      cameraId: "cam_1",
      frames: {},
      framesOrder: [
        "frame_1",
        "frame_1",
        "frame_1",
        "frame_1",
        "frame_1",
        "frame_1",
        "frame_1",
        "frame_1",
        "frame_1",
        "frame_1",
      ],
      maxFrameCount: 12,
      dateLoaded: Date.now(),
      dateCompleted: Date.now(),
      dateProcessed: Date.now(),
    },
  },
};

export const { actions, reducer } = createSlice({
  name: "rolls",
  initialState,
  reducers: {
    reset: () => initialState,
    resetTempRoll: (state) => {
      state.tempRoll = blankRoll;
    },
    setTempRollFilmStock: (
      state,
      action: PayloadAction<{ filmStockId: string }>,
    ) => {
      state.tempRoll.filmStockId = action.payload.filmStockId;
    },
    setTempRollCamera: (state, action: PayloadAction<{ cameraId: string }>) => {
      state.tempRoll.cameraId = action.payload.cameraId;
    },
    setTempRollExtraInfo: (
      state,
      action: PayloadAction<{ maxFrameCount: number; notes?: string }>,
    ) => {
      state.tempRoll.maxFrameCount = action.payload.maxFrameCount;
      state.tempRoll.notes = action.payload.notes;
    },
    saveTempRoll: (state) => {
      const rollId = uuid("roll");
      state.rolls[rollId] = {
        ...state.tempRoll,
        id: rollId,
        dateLoaded: Date.now(),
      };
      state.tempRoll = blankRoll;
    },
    deleteRoll: (state, action: PayloadAction<{ rollId: string }>) => {
      delete state.rolls[action.payload.rollId];
    },
  },
});

export function reset() {
  return function (dispatch: Dispatch) {
    dispatch(actions.reset());
  };
}

export function resetTempRoll() {
  return function (dispatch: Dispatch) {
    dispatch(actions.resetTempRoll());
  };
}

export function setTempRollFilmStock(filmStockId: string) {
  return function (dispatch: Dispatch) {
    dispatch(actions.setTempRollFilmStock({ filmStockId }));
  };
}

export function setTempRollCamera(cameraId: string) {
  return function (dispatch: Dispatch) {
    dispatch(actions.setTempRollCamera({ cameraId }));
  };
}

export function setTempRollExtraInfo(maxFrameCount: number, notes?: string) {
  return function (dispatch: Dispatch) {
    dispatch(actions.setTempRollExtraInfo({ maxFrameCount, notes }));
  };
}

export function saveTempRoll() {
  return function (dispatch: Dispatch) {
    dispatch(actions.saveTempRoll());
  };
}

export function deleteRoll(rollId: string) {
  return function (dispatch: Dispatch) {
    dispatch(actions.deleteRoll({ rollId }));
  };
}

function rollById(state: AppState, id: string): ComputedRoll | undefined {
  const roll = state.rolls.rolls[id];

  if (!roll) {
    return;
  }

  const filmStock = filmStockSelectors.filmStockById(state, roll.filmStockId);
  const camera = cameraBagSelectors.cameraById(state, roll.cameraId);

  return {
    ...roll,
    filmStockName: filmStock ? filmStock.name : "",
    cameraName: camera ? camera.name : "",
    framesTaken: roll.framesOrder.length,
    isComplete: Boolean(roll.dateCompleted),
    isProcessed: Boolean(roll.dateProcessed),
  };
}

function isRollActive(roll: ComputedRoll) {
  return Boolean(
    roll.framesTaken < roll.maxFrameCount &&
      !roll.isComplete &&
      !roll.isProcessed,
  );
}

function isRollComplete(roll: ComputedRoll) {
  return Boolean(roll.isComplete && !roll.isProcessed);
}

function isRollProcessed(roll: ComputedRoll) {
  return Boolean(roll.isProcessed);
}

function rollsList(state: AppState): ComputedRoll[] {
  const list = [];
  for (const id of Object.keys(state.rolls.rolls)) {
    const result = rollById(state, id);
    if (result) {
      list.push(result);
    }
  }
  return list;
}

function rollsListGrouped(
  state: AppState,
): {
  shooting: ComputedRoll[];
  complete: ComputedRoll[];
  processed: ComputedRoll[];
} {
  const shooting = [];
  const complete = [];
  const processed = [];
  for (const id of Object.keys(state.rolls.rolls)) {
    const result = rollById(state, id);
    if (result && isRollActive(result)) {
      shooting.push(result);
    }
    if (result && isRollComplete(result)) {
      complete.push(result);
    }
    if (result && isRollProcessed(result)) {
      processed.push(result);
    }
  }
  return { shooting, complete, processed };
}

function tempRoll(state: AppState): Roll {
  return state.rolls.tempRoll;
}

export const rollSelectors = {
  rollById,
  rollsList,
  rollsListGrouped,
  tempRoll,
};
