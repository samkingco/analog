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
  frames: Frame[];
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
  hasFramesLeft: boolean;
  isComplete: boolean;
  isProcessed: boolean;
}

export interface Frame {
  id: string;
  lensId: CameraLens["id"];
  captureTime: number;
  focalLength: number;
  aperture: number;
  shutterSpeed: number;
  notes?: string;
}

interface FilmLogState {
  rolls: {
    [id: string]: Roll;
  };
  tempRoll: Roll;
  tempFrame: Frame;
}

const blankRoll: Roll = {
  id: "roll_blank",
  filmStockId: "",
  cameraId: "",
  frames: [],
  maxFrameCount: 0,
  dateLoaded: Date.now(),
};

const blankFrame: Frame = {
  id: "frame_blank",
  lensId: "",
  captureTime: Date.now(),
  focalLength: 0,
  aperture: 0,
  shutterSpeed: 0,
};

const initialState: FilmLogState = {
  tempRoll: blankRoll,
  tempFrame: blankFrame,
  rolls: {
    roll_1: {
      id: "roll_1",
      filmStockId: "kodak-portra-400",
      cameraId: "cam_1",
      frames: [
        {
          id: "frame_1",
          lensId: "lens_1",
          captureTime: Date.now(),
          focalLength: 80,
          aperture: 2.8,
          shutterSpeed: 1 / 250,
          notes: "A really cool reflection",
        },
        {
          id: "frame_2",
          lensId: "lens_1",
          captureTime: Date.now(),
          focalLength: 80,
          aperture: 4,
          shutterSpeed: 1 / 250,
        },
      ],
      maxFrameCount: 12,
      dateLoaded: Date.now(),
    },
    roll_2: {
      id: "roll_2",
      filmStockId: "kodak-t-max-400",
      cameraId: "cam_2",
      frames: [],
      maxFrameCount: 12,
      dateLoaded: Date.now(),
    },
    roll_3: {
      id: "roll_3",
      filmStockId: "kodak-portra-400",
      cameraId: "cam_1",
      frames: [],
      maxFrameCount: 12,
      dateLoaded: Date.now(),
      dateCompleted: Date.now(),
    },
    roll_4: {
      id: "roll_4",
      filmStockId: "kodak-portra-400",
      cameraId: "cam_1",
      frames: [],
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
    updateTempRoll: (state, action: PayloadAction<Partial<Roll>>) => {
      state.tempRoll = {
        ...state.tempRoll,
        ...action.payload,
      };
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
    toggleComplete: (state, action: PayloadAction<{ rollId: string }>) => {
      const roll = state.rolls[action.payload.rollId];
      if (roll.dateCompleted) {
        roll.dateCompleted = undefined;
      } else {
        roll.dateCompleted = Date.now();
      }
    },
    toggleProcessed: (state, action: PayloadAction<{ rollId: string }>) => {
      const roll = state.rolls[action.payload.rollId];
      if (roll.dateProcessed) {
        roll.dateProcessed = undefined;
      } else {
        roll.dateProcessed = Date.now();
      }
    },
    deleteRoll: (state, action: PayloadAction<{ rollId: string }>) => {
      delete state.rolls[action.payload.rollId];
    },
    resetTempFrame: (state) => {
      state.tempFrame = blankFrame;
    },
    updateTempFrame: (state, action: PayloadAction<Partial<Frame>>) => {
      state.tempFrame = {
        ...state.tempFrame,
        ...action.payload,
      };
    },
    saveTempFrame: (state, action: PayloadAction<{ rollId: string }>) => {
      const roll = state.rolls[action.payload.rollId];
      const frameId = uuid("frame");
      const frame = {
        ...state.tempFrame,
        id: frameId,
        captureTime: Date.now(),
      };
      roll.frames = [...roll.frames, frame];
      if (roll.frames.length === roll.maxFrameCount) {
        roll.dateCompleted = Date.now();
      }
      state.tempFrame = blankFrame;
    },
    updateFrame: (
      state,
      action: PayloadAction<{ rollId: string; frame: Partial<Frame> }>,
    ) => {
      const roll = state.rolls[action.payload.rollId];
      const indexOfFrame = roll.frames.findIndex(
        (i) => i.id === action.payload.frame.id,
      );
      let rollFrame = roll.frames[indexOfFrame];
      roll.frames = [
        ...roll.frames.slice(0, indexOfFrame),
        {
          ...rollFrame,
          ...action.payload.frame,
        },
        ...roll.frames.slice(indexOfFrame + 1, roll.frames.length),
      ];
    },
    deleteFrame: (
      state,
      action: PayloadAction<{ rollId: string; frameId: string }>,
    ) => {
      const roll = state.rolls[action.payload.rollId];
      roll.frames = roll.frames.filter((i) => i.id !== action.payload.frameId);
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

export function updateTempRoll(payload: Partial<Roll>) {
  return function (dispatch: Dispatch) {
    dispatch(actions.updateTempRoll(payload));
  };
}

export function saveTempRoll() {
  return function (dispatch: Dispatch) {
    return dispatch(actions.saveTempRoll());
  };
}

export function deleteRoll(rollId: string) {
  return function (dispatch: Dispatch) {
    dispatch(actions.deleteRoll({ rollId }));
  };
}

export function toggleComplete(rollId: string) {
  return function (dispatch: Dispatch) {
    dispatch(actions.toggleComplete({ rollId }));
  };
}

export function toggleProcessed(rollId: string) {
  return function (dispatch: Dispatch) {
    dispatch(actions.toggleProcessed({ rollId }));
  };
}

export function resetTempFrame() {
  return function (dispatch: Dispatch) {
    dispatch(actions.resetTempFrame());
  };
}

export function updateTempFrame(payload: Partial<Frame>) {
  return function (dispatch: Dispatch) {
    dispatch(actions.updateTempFrame(payload));
  };
}

export function saveTempFrame(rollId: string) {
  return function (dispatch: Dispatch) {
    dispatch(actions.saveTempFrame({ rollId }));
  };
}

export function updateFrame(rollId: string, frame: Partial<Frame>) {
  return function (dispatch: Dispatch) {
    dispatch(actions.updateFrame({ rollId, frame }));
  };
}

export function deleteFrame(rollId: string, frameId: string) {
  return function (dispatch: Dispatch) {
    dispatch(actions.deleteFrame({ rollId, frameId }));
  };
}

function rollById(state: AppState, id: string): ComputedRoll | undefined {
  const roll = state.rolls.rolls[id];

  if (!roll) {
    return;
  }

  const filmStock = filmStockSelectors.filmStockById(state, roll.filmStockId);
  const camera = cameraBagSelectors.cameraById(state, roll.cameraId);
  const framesTaken = roll.frames.length;

  return {
    ...roll,
    filmStockName: filmStock ? filmStock.name : "",
    cameraName: camera ? camera.name : "",
    framesTaken,
    hasFramesLeft: framesTaken < roll.maxFrameCount,
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

function tempFrame(state: AppState): Frame {
  return state.rolls.tempFrame;
}

export const rollSelectors = {
  rollById,
  rollsList,
  rollsListGrouped,
  tempRoll,
  tempFrame,
};
