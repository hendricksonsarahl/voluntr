def true():
    return True

def test_true():
    assert true() == True

def test_false():
    assert true() != False
