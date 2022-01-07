from backend.repositories.base import filter_params_normalize
import pytest


@pytest.mark.parametrize('filters,expected', [
    (
            {
                "age": 10
            },
            {
                'age': 10
            }
    ),
    (
            {
                'age__gt': 10
            },
            {
                "age": {"$gt": 10}
            }
    ),
    (
            {
                'nbr_of_players__gt': 1,
                'cost_per_player': 1,
            },
            {
                'nbr_of_players': {"$gt": 1},
                "cost_per_player": 1
            }
    )
])
def test_params_normalize_creates_operator_expressions(filters, expected):
    assert filter_params_normalize(filters) == expected
