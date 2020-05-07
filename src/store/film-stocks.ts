import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Dispatch, AppState } from "./";
import { FilmStock, filmStocks } from "./film-stock-database";

interface ComputedFilmStock extends FilmStock {
  isFavourite?: boolean;
}

interface FilmStocksState {
  filmStocks: {
    [id: string]: FilmStock;
  };
  favourites: FilmStock["id"][];
}

const initialState: FilmStocksState = {
  filmStocks: filmStocks.reduce(
    (state, stock) => ({
      ...state,
      [stock.id]: stock,
    }),
    {},
  ),
  favourites: [],
};

export const { actions, reducer } = createSlice({
  name: "filmStocks",
  initialState,
  reducers: {
    reset: () => initialState,
    toggleFavouriteStatus: (state, action: PayloadAction<{ id: string }>) => {
      if (state.favourites.includes(action.payload.id)) {
        state.favourites = state.favourites.filter(
          (id) => id === action.payload.id,
        );
      } else {
        state.favourites.push(action.payload.id);
      }
    },
  },
});

export function reset() {
  return function (dispatch: Dispatch) {
    dispatch(actions.reset());
  };
}

export function toggleFavouriteStatus(id: string) {
  return function (dispatch: Dispatch) {
    dispatch(actions.toggleFavouriteStatus({ id }));
  };
}

function isFavourite(state: AppState, id: string): boolean {
  return state.filmStocks.favourites.includes(id);
}

function filmStockById(
  state: AppState,
  id: string,
): ComputedFilmStock | undefined {
  const filmStock = state.filmStocks.filmStocks[id];

  if (!filmStock) {
    return;
  }

  return {
    ...filmStock,
    isFavourite: isFavourite(state, id),
  };
}

function filmStocksList(state: AppState): ComputedFilmStock[] {
  const list = [];
  for (const id of Object.keys(state.filmStocks.filmStocks)) {
    const result = filmStockById(state, id);
    if (result) {
      list.push(result);
    }
  }
  return list;
}

export const filmStockSelectors = {
  filmStockById,
  filmStocksList,
};
